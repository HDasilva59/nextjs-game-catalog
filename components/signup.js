
  var webAuth = new auth0.WebAuth({
    domain:       'localhost:3000',
    clientID:     process.env.AUTH0_CLIENT_ID
  });

  webAuth.signup({
    connection: 'CONNECTION',
    email: 'EMAIL',
    password: 'PASSWORD',
    username: "johndoe",
    given_name: "John",
    family_name: "Doe",
    name: "John Doe",
    nickname: "johnny",
    picture: "http://example.org/jdoe.png",
    user_metadata: { plan: 'silver', team_id: 'a111' }
  }, function (err) {
    if (err) return alert('Something went wrong: ' + err.message);
      return alert('success signup without login!')
  });
