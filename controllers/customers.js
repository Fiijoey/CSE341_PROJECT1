const mongodb = require("../dB/db");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  try {
    const staffList = await mongodb
      .getDatabase()
      .db()
      .collection("customers")
      .find();
    staffList
      .toArray()
      .then((customers) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(customers);
      })
      .catch((error) => {
        res.status(500).json({ error: "Failed to retrieve customers" });
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching customers" });
  }
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid ID");
  }

  const userId = new ObjectId(req.params.id);
  const customer = await mongodb
    .getDatabase()
    .db()
    .collection("customers")
    .find({ _id: userId });
  customer.toArray().then((customer) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(customer[0]);
  });
};

const createNewCustomer = async (req, res) => {
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
};

const updateCustomer = async (req, res) => {
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
};

const deleteCustomer = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Invalid ID");
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
};

module.exports = {
  getAll,
  getSingle,
  createNewCustomer,
  updateCustomer,
  deleteCustomer,
};
