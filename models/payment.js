const mongoose = require('mongoose');
const { Schema } = mongoose;
const paymentSchema = Schema({
  team: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model('payment', paymentSchema);