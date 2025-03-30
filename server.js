const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("./dB/db");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());

app.use(passport.session());
// IMPORTANT: Ensure you are accessing the API via http://localhost:3000 instead of directly opening files.
// Using file:// protocol will cause CORS errors as browsers enforce same-origin policy.
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Z-Key",
      "Authorization",
    ],
  })
);
app.use("/", require("./routes"));

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // Save user profile to the database or perform any other actions
      console.log("User profile:", profile);
      return done(null, profile);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged out"
  );
});

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect("/");
  }
);

// Error handling
process.on("uncaughtException", (err, Origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${Origin}`
  );
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
      console.log(`Swagger UI available at: http://localhost:${port}/api-docs`);
    });
  }
});
