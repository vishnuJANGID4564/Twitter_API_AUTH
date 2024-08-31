const express = require('express');
const cors = require('cors');
const { Client, auth } = require('twitter-api-sdk');
require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(cors()); 
app.use(express.json()); 

const oauth2Client = new auth.OAuth2User({
    client_id: process.env.TWITTER_CLIENT_ID,
    client_secret: process.env.TWITTER_CLIENT_SECRET,
    callback: "http://127.0.0.1:5000/twitter/callback",
    scopes: [
        "users.read",
        "tweet.read",
        "tweet.write",
        "offline.access",
    ],
});

app.get('/connect-to-twitter', async (req, res) => {
    const authUrl = oauth2Client.generateAuthURL({
        state: 'some-random-state', // You can put the user's ID or something else here
        code_challenge_method: 's256',
        redirect_uri: 'http://127.0.0.1:5000/twitter/callback'
    });

    res.redirect(authUrl);
});


app.get('/twitter/callback', async (req, res) => {
    console.log('Hello from callback');
    const { code, state } = req.query;
    try {
        console.log('hello from try block');
        const token = await oauth2Client.requestAccessToken(code);
        console.log(token);
        // Here, you can store the token in your database
        res.json({ token });
        
    } catch (error) {
        console.log('hello from catch block');
        res.status(500).send('Authentication failed');
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
