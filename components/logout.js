var webAuth = new auth0.WebAuth({
  domain:       'localhost:3000',
  clientID:     process.env.AUTH0_CLIENT_ID
});

webAuth.logout({
  returnTo: process.env.AUTH0_REDIRECTURI_LOGOUT,
  client_id: process.env.AUTH0_CLIENT_ID
});
