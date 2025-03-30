const passport = require("passport");

const router = require("express").Router();

router.use("/", require("./swagger"));
router.use("/staffs", require("./staffs"));
router.use("/customers", require("./customers"));

router.get("/", (req, res) => {
  res.send(
    "Welcome to this project which started in week3. Congrats. You mad it!"
  );
});

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
