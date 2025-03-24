const express = require("express");
const router = express.Router();

const usersController = require("../controllers/staffs");
const validation = require("../middleware/validate");

router.get("/", usersController.getAll);

router.get("/:id", usersController.getSingle);

router.post("/", validation.saveStaff, usersController.createNewStaffMember);

router.put("/:id", validation.saveStaff, usersController.updateStaffMember);

router.delete("/:id", usersController.deleteStaffMember);

module.exports = router;
