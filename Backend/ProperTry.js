const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();
const port = 3000; // or any port you prefer

app.use(express.json()); // Middleware to parse JSON bodies

app.post('/get-token', async (req, res) => {
  try {
    const postData = querystring.stringify({
      'code': 'WEtlNVRqRlVfMVJIZkFaNFpmTk1RbXNwUS1sei1la2U4VTZkWWFDQm1FTGFUOjE3MjU4ODYyNjAwMjc6MToxOmFjOjE',
      'grant_type': 'authorization_code',
      'redirect_uri': 'https://google.com',
      'code_verifier': 'challenge'
    });

    const response = await axios.post('https://api.twitter.com/2/oauth2/token', postData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ZVZabGQwUkNjbWgyTFhKQ05rMHlMV1ZJU0VrNk1UcGphUTpReXd6aWJfRlVTak1OSHk0dlRoOWp3NTAwNElZSWM5MVVWM1F0U0hSdl9ZTUd1bEI0ZQ==',
        'Cookie': 'guest_id=v1%3A172414916401696890; guest_id_ads=v1%3A172414916401696890; guest_id_marketing=v1%3A172414916401696890; personalization_id="v1_JrzA5qfJOoYRsD5Hkbdnig=="'
      },
      maxRedirects: 20
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
