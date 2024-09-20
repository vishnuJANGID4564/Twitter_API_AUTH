var https = require('follow-redirects').https;
var fs = require('fs');

var qs = require('querystring');

var options = {
  'method': 'POST',
  'hostname': 'api.twitter.com',
  'path': '/2/oauth2/token',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ZVZabGQwUkNjbWgyTFhKQ05rMHlMV1ZJU0VrNk1UcGphUTpReXd6aWJfRlVTak1OSHk0dlRoOWp3NTAwNElZSWM5MVVWM1F0U0hSdl9ZTUd1bEI0ZQ==',
    'Cookie': 'guest_id=v1%3A172414916401696890; guest_id_ads=v1%3A172414916401696890; guest_id_marketing=v1%3A172414916401696890; personalization_id="v1_JrzA5qfJOoYRsD5Hkbdnig=="'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});


var postData = qs.stringify({
  'code': 'U1lrMXlMZE4tOEYzUThFZ3EzZ0hoVms0cFQzZHA3SXhaOEZVUGpad1VTUVFuOjE3MjU5NTI3ODIwMDU6MToxOmFjOjE',
  'grant_type': 'authorization_code',
  'redirect_uri': 'https://google.com',
  'code_verifier': 'challenge'
});

req.write(postData);

req.end();