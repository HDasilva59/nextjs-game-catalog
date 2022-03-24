
var webAuth = new auth0.WebAuth({
  domain:       'localhost:3000',
  clientID:     process.env.AUTH0_CLIENT_ID
});

webAuth.authorize({
  connection: 'google-oauth2'
});

webAuth.authorize({
  connection: 'github'
});

webAuth.popup.authorize({
  connection: 'twitter'
});
