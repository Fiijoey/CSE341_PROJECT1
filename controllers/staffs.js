const mongodb = require("../dB/db");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const staffList = await mongodb
      .getDatabase()
      .db()
      .collection("staff_members")
      .find();
    staffList
      .toArray()
      .then((Staffs) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(Staffs);
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to retrieve staff members" });
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching staff members" });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid ID");
  }

  const userId = new ObjectId(req.params.id);
  const staffmember = await mongodb
    .getDatabase()
    .db()
    .collection("staff_members")
    .find({ _id: userId });
  staffmember.toArray().then((staff) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(staff[0]);
  });
};

const createNewStaffMember = async (req, res) => {
  const newStaffMember = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    department: req.body.department,
    position: req.body.position,
    stateDate: req.body.startDate,
    address: req.body.address
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
};

const updateStaffMember = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const newStaffMember = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    department: req.body.department,
    position: req.body.position,
    stateDate: req.body.startDate,
    address: req.body.address
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
};

const deleteStaffMember = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid ID");
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
};

module.exports = {
  getAll,
  getSingle,
  createNewStaffMember,
  updateStaffMember,
  deleteStaffMember,
};
