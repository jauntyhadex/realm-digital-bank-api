const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: String,
    required: true,
  },

  bvn: {
    type: String,
  },

  nin: {
    type: String,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  accountNumber: {
    type: String,
  },

  balance: {
    type: Number,
    default: 15000,
  },
});

module.exports = mongoose.model("Customer", customerSchema);