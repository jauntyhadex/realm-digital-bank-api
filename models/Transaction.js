const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

  fromAccount: {
    type: String,
    required: true,
  },

  toAccount: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  transactionReference: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "successful",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model(
  "Transaction",
  transactionSchema
);