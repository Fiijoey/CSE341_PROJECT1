const express = require("express");
const router = express.Router();

const usersController = require("../controllers/customers");
const validation = require("../middleware/validate");

const { IsAuthenticated } = require("../middleware/authenticate");

router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);
router.post(
  "/",
  IsAuthenticated,
  validation.saveStaff,
  usersController.createNewCustomer
);
router.put(
  "/:id",
  IsAuthenticated,
  validation.saveStaff,
  usersController.updateCustomer
);
router.delete("/:id", IsAuthenticated, usersController.deleteCustomer);

module.exports = router;
