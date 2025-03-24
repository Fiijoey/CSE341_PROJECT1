const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  res.send(
    "Welcome to this project which started in week3. Congrats. You mad it!"
  );
});

router.use("/staffs", require("./staffs"));

module.exports = router;
