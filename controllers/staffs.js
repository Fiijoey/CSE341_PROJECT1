const mongodb = require("../dB/db");
const ObjectId = require("mongodb").ObjectId;
const asyncHandler = require("../helpers/asyncHandler");

const getAll = asyncHandler(async (req, res) => {
  const staffList = await mongodb
    .getDatabase()
    .db()
    .collection("staff_members")
    .find();
  const Staffs = await staffList.toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(Staffs);
});

const getSingle = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const userId = new ObjectId(req.params.id);
  const staffmemberCursor = await mongodb
    .getDatabase()
    .db()
    .collection("staff_members")
    .find({ _id: userId });
  const staff = await staffmemberCursor.toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(staff[0]);
});

const createNewStaffMember = asyncHandler(async (req, res) => {
  const newStaffMember = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    department: req.body.department,
    position: req.body.position,
    stateDate: req.body.startDate,
    address: req.body.address,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("staff_members")
    .insertOne(newStaffMember);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error creating The staff member");
  }
});

const updateStaffMember = asyncHandler(async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const newStaffMember = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    department: req.body.department,
    position: req.body.position,
    stateDate: req.body.startDate,
    address: req.body.address,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("staff_members")
    .replaceOne({ _id: userId }, newStaffMember);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error updating The staff member");
  }
});

const deleteStaffMember = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("staff_members")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error deleting The staff member");
  }
});

module.exports = {
  getAll,
  getSingle,
  createNewStaffMember,
  updateStaffMember,
  deleteStaffMember,
};
