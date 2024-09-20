const express = require('express');
const cors = require('cors');
const { Client, auth } = require('twitter-api-sdk');
require('dotenv').config();
const axios = require('axios');

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://vsharwork:9tE9AUXAz0XMdxfl@cluster0.4ripo.mongodb.net/");
const tokenSchema = mongoose.Schema({
    userId:String,
    accessToken:String,
    refreshToken:String,
    expires_at:Number
});
const TOKEN_INFO = mongoose.model('token_info',tokenSchema);

const app = express();
app.use(cors()); 
app.use(express.json()); 

const oauth2Client = new auth.OAuth2User({
    client_id: process.env.TWITTER_CLIENT_ID,
    client_secret: process.env.TWITTER_CLIENT_SECRET,
    callback: "http://localhost:5173/redirect",
    scopes: [
        "users.read",
        "tweet.read",
        "tweet.write",
        "like.read",
        "like.write",
        "follows.read",
        "follows.write",
        "offline.access"
    ],
});

app.get('/connect-to-twitter', async (req, res) => {
    const userId = req.query.userId;
    const authUrl = oauth2Client.generateAuthURL({
        state: userId, 
        code_challenge_method: 's256',
        redirect_uri: 'http://localhost:5173/redirect'
    })

    res.redirect(authUrl);
});
 

app.get('/twitter/callback', async (req, res) => {

    const code = req.query.code;
    const state = req.query.state;
    try {
        // checking for double request///////////////////////////
        const existingToken = await TOKEN_INFO.findOne({ userId: state });
        if (existingToken) {
            return;
        }
        ///////////////////////////////////

        console.log(`state recieved from redirectURL:-> ${state} `);
        if (!code) {
            return res.status(400).json({ error: 'Authorization code missing or invalid' });
        }        

        const token = await oauth2Client.requestAccessToken(code);
        console.log(token);
  
        const tkn_info = new TOKEN_INFO({
            userId : state,
            accessToken: token.token.access_token,
            refreshToken: token.token.refresh_token,
            expires_at : token.token.expires_at,
        })
        await tkn_info.save();
        console.log("token stored successful");

        res.json({msg : 'Token stored Successfully'});
        
    } catch (error) {
        console.error('Error during authentication callback:', error);
        res.status(500).send('Error during authentication callback');
    }
});


async function scheduleRefreshOfToken(userId,expiresAt) {
    const timeUntillExpiration = expiresAt - new Date();
    // we want to refresh 5 minutes before expiration 
    const refresh_time = timeUntillExpiration - 119*60*1000 ;

    setTimeout(async () => {
        try {
            const newAccessToken = await refreshToken(userId);
            console.log(`The new Access token of user with userId: ${userId} is ${newAccessToken}`); 
        } 
        catch (error) {
            console.error('Failed to refresh access token:', error);
        }
    }, refresh_time);
}


async function refreshToken(userId) {
    try {
        const token = await TOKEN_INFO.findOne({ userId: userId });

        if(!token || !token.refreshToken){
            console.log(`User not found or the Refresh token is not found`);
        }

        console.log('Token for user:', token);

        console.log('Attempting to refresh token using refresh token:', token.refreshToken);

        const newToken = await oauth2Client.refreshAccessToken(token.refreshToken);

        console.log('New access token generated');

        await TOKEN_INFO.findOneAndUpdate(
            { userId: userId },
            {   
                userId: userId,
                accessToken: newToken.token.access_token,
                refreshToken: newToken.token.refresh_token,
                expires_at: newToken.token.expires_at,
            },
            { upsert: true }
        );
        
        // await scheduleRefreshOfToken(userId, newToken.token.expires_at);
        console.log(`Token refreshed for userId: ${userId}`);

        return newToken.token.access_token;
    } 
    catch (error) {
        console.error(`Error refreshing token for userId: ${userId}:`, error);
        throw error; // Re-throw the error to propagate it upwards
    }
}

////////////////
/// POST //////
//////////////

// Function to post on behalf of users
async function postOnBehalfOfUsers(content) {
    try {
        // Getting all the users 
        const users = await TOKEN_INFO.find({});

        for (let user of users) {
            // Refresh if token is expired 
            console.log("Difference" , user.expires_at -Date.now());
            if (user.expires_at <= Date.now()) {
                console.log(`Token expired for userId: ${user.userId}, refreshing token...`);
                try {
                    const newAccessToken = await refreshToken(user.userId);
                    console.log(`New access Token for userId ${user.userId}: ${newAccessToken}`);
                } 
                catch (refreshError) {
                    console.error(`Failed to refresh token for userId: ${user.userId}`, refreshError);
                    continue; // Skip this user if token refresh fails
                }
            }

            // Now, use the user's access token to post content
            await postToTwitter(user.accessToken, content, user.userId);
        }

    } catch (error) {
        console.error('Error posting on behalf of users:', error);
    }
}

// Function to post to Twitter
async function postToTwitter(accessToken, content, userId) {
    try {
        // console.log(accessToken);
        const client = await new Client(accessToken);  // Use twitter-api-sdk's Client with the access token
        console.log(`client => ${client}`);
        const response = await client.tweets.createTweet({
            text: content,  // This is the content to post
        });

        console.log(`Successfully posted on behalf of userId: ${userId}. Tweet ID: ${response.data.id}`);
    } catch (error) {
        console.error(`Error posting on behalf of userId: ${userId}:`, error);
    }
}

app.post('/post-to-twitter',async (req,res)=>{
    const content = req.body.content;
    try {
        console.log("hello");
        await postOnBehalfOfUsers(content);  // Post on behalf of all users in the DB
        res.json({ msg: 'Posted on behalf of all users' });
    } catch (error) {
        console.error('Error posting on Twitter:', error);
        res.status(500).send('Error posting on Twitter');
    }
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
