// The above code will include the MySQL, Express, Express-session, and Path modules, and associate them with the variables we have declared.
import mysql from "mysql";
import express from "express";
import session from "express-session";
import path from "path";
import "./config"

// We can now connect to our database with the following code:
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "nodelogin",
});
console.log("we are connected to mysql server");

// Express is what we'll use for our web application, which includes packages that are essential for server-side web development, such as sessions and handling HTTP requests.
// Add the following code to initialize express 
const app = express();
//After, we need to associate the modules we'll be using with Express:
app.use(
  session({
    // To secure the session cookie
    secret: "secret",
    // For every request , it rest the session cookie
    resave: true,
    // the saveUninitialized : false will not create a new session for the user if you don't add anything to the session like 
    saveUninitialized: true,
  })
);
// The json and urlencoded methods will extract the form data from our login.html file.
app.use(express.json());
// express.urlencoded() for POST and PUT requests, because in both these requests you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request
app.use(express.urlencoded({ extended: true }));
// The __dirname in a node script returns the path of the folder where the current JavaScript file resides. __filename and __dirname are used to get the filename and directory name of the currently executing file.
app.use(express.static(path.join(__dirname, "static")));

///// TIP //////
// Secure Sockets Layer
// SSL stands for Secure Sockets Layer and, in short,
// it's the standard technology for keeping an internet connection secure and safeguarding any sensitive data that is being sent between two systems.

app.get("/", function (request: any, response: any) {
  // Render login template
  response.sendFile(path.join(__dirname + "/login.html"));
  // http://localhost:3000/auth
  app.post("/auth", function (request: any, response: any) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exists and are not empty
    if (username && password) {
      // Execute SQL query that'll select the account from the database based on the specified username and password
      connection.query(
        "SELECT * FROM accounts WHERE username = ? AND password = ?",
        [username, password],
        function (error: any, results: any, fields: any) {
          // If there is an issue with the query, output the error
          if (error) throw error;
          // If the account exists
          if (results.length > 0) {
            // Authenticate the user
            request.session.loggedin = true;
            request.session.username = username;
            // Redirect to home page
            response.sendFile(__dirname + "/home.html");
          } else {
            response.send('<h1 style="text-align:center; background-color:lightblue" >Sorry, We cant find you</h1>');          }
        }
      );
    } else {
    }
  });
});
// http://localhost:3000/home
app.get('/home', function (request: any, response: any) {
  // If the user is loggedin
  if (request.session.loggedin) {
    // Output username
    response.sendFile(__dirname + "/home.html");

  } else {
    // Not logged in
    response.send('<h1 style="text-align:center">login to view this page</h1>');
  }

}
);
app.get('*', (req, res) => {
  res.send('<h1 style = "text-align:center; font-size:80px">404</h1>')
})
app.listen(3000, () => {
  console.log("Listening on http://localhost:3000")
});
