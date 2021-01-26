const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  team: { type: String, required: true },
});

module.exports = mongoose.model('payment', paymentSchema);
