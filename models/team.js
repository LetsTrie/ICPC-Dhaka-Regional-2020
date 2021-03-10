const mongoose = require('mongoose');
const { Schema } = mongoose;
const teamSchema = Schema(
  {
    Team_Name: String,
    University: String,
    University_Short_Form: String,
    Country: String,
    Coach: String,
    Coach_Email: String,
    Member1: String,
    Member1_Email: String,
    Member2: String,
    Member2_Email: String,
    Member3: String,
    Member3_Email: String,
    team_id: String,
    payment_transition_id: String,
    teamPaymentMailSend: {
      type: Boolean,
      default: false
    },
    teamPaymentMailSendTime: Date,
    payment_status: {
      type: String,
      default: 'Not Paid Yet',
    },
    payment_date: Date,
  },
  { timestamps: true }
);

const Team = mongoose.model('teams', teamSchema);

module.exports = Team;
