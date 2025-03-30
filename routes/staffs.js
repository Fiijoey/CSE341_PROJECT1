const express = require("express");
const router = express.Router();

const usersController = require("../controllers/staffs");
const validation = require("../middleware/validate");

const { IsAuthenticated } = require("../middleware/authenticate");

router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);
router.post(
  "/",
  IsAuthenticated,
  validation.saveStaff,
  usersController.createNewStaffMember
);
router.put(
  "/:id",
  IsAuthenticated,
  validation.saveStaff,
  usersController.updateStaffMember
);
router.delete("/:id", IsAuthenticated, usersController.deleteStaffMember);

module.exports = router;
