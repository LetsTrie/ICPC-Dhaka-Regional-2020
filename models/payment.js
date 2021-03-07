const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
  {
    Team_Name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('payment', paymentSchema);
