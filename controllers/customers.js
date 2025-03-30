const mongodb = require("../dB/db");
const ObjectId = require("mongodb").ObjectId;
const asyncHandler = require("../helpers/asyncHandler");

const getAll = asyncHandler(async (req, res) => {
  const staffList = await mongodb
    .getDatabase()
    .db()
    .collection("customers")
    .find();
  const customers = await staffList.toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(customers);
});

const getSingle = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const userId = new ObjectId(req.params.id);
  const customerCursor = await mongodb
    .getDatabase()
    .db()
    .collection("customers")
    .find({ _id: userId });
  const customer = await customerCursor.toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(customer[0]);
});

const createNewCustomer = asyncHandler(async (req, res) => {
  const newCustomer = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("customers")
    .insertOne(newCustomer);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error creating a new customer");
  }
});

const updateCustomer = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const userId = new ObjectId(req.params.id);
  const newCustomer = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("customers")
    .replaceOne({ _id: userId }, newCustomer);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error updating the customer");
  }
});

const deleteCustomer = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("customers")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Error deleting the customer");
  }
});

module.exports = {
  getAll,
  getSingle,
  createNewCustomer,
  updateCustomer,
  deleteCustomer,
};
