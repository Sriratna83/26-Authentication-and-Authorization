const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const app = express();
const port = 3000;
const { cookie } = require("express/lib/response");


app.use(sessions(
    {
        secret: "secretsecret",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 },
    }
));

const myusername = "user1";
const mypassword = "mypassword";

var session;

app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  session = req.session;
  if (session.userid) {
    res.send(
      "Hello, Welcome<a href='/logout'> click to logout</a>"
    );
  } else {
    res.sendFile("views/index.html", { root: "views" });
  }
});

app.post("/user", (req, res) => {
  if (req.body.username == myusername && req.body.password == mypassword) {
    session = req.session;
    session.userid = req.body.username;
    console.log(req.session);
    res.send(`Hello, Welcome <a href=\'/logout'>click to logout</a>`);
  } else {
    res.send("Invalid username or password");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(port, () => {
  console.log("server is listening on port", port);
});