const validator = require("../helpers/validate");
const saveStaff = async (req, res, next) => {
  const validationRule = {
    name: "required|string",
    email: "required|string",
    age: "required|integer",
    department: "required|string",
    position: "string",
    startDate: "required|date",
    address: "required|string",
  };

  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};
module.exports = {
  saveStaff,
};
