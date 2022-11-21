import mysql from "mysql";
import express from "express";
import session from "express-session";
import path from "path";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "nodelogin",
});

const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", function (request:any, response:any) {
  // Render login template
  response.sendFile(path.join(__dirname + "/login.html"));
  // http://localhost:3000/auth
  app.post("/auth", function (request:any, response:any) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
      // Execute SQL query that'll select the account from the database based on the specified username and password
      connection.query(
        "SELECT * FROM accounts WHERE username = ? AND password = ?",
        [username, password],
        function (error:any, results:any, fields:any) {
          // If there is an issue with the query, output the error
          if (error) throw error;
          // If the account exists
          if (results.length > 0) {
            // Authenticate the user
            request.session.loggedin = true;
            request.session.username = username;
            // Redirect to home page
            response.redirect("/home");
          } else {
            response.send("Incorrect Username and/or Password!");
          }
          response.end();
        }
      );
    } else {
      response.send("Please enter Username and Password!");
      response.end();
    }
  });
});
// http://localhost:3000/home
app.get('/home', function(request:any, response:any) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});
app.listen(3000);
