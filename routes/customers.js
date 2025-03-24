const express = require("express");
const router = express.Router();

const usersController = require("../controllers/customers");
const validation = require("../middleware/validate");

router.get("/", usersController.getAll);

router.get("/:id", usersController.getSingle);

router.post("/", validation.saveStaff, usersController.createNewCustomer);

router.put("/:id", validation.saveStaff, usersController.updateCustomer);

router.delete("/:id", usersController.deleteCustomer);

module.exports = router;
