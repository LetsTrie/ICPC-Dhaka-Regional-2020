const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = Schema(
  {
    team: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    transactionSuccess: {
      type: Boolean,
      required: false,
    },
    coach: {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      affiliation: {
        type: String,
        required: true,
      },
      designation: {
        type: String,
        required: true,
      },
      tshirtSize: {
        type: String,
        required: true,
      },
      dp: {
        type: String,
        required: true,
      },
    },
    participants: [
      {
        firstname: {
          type: String,
          required: true,
        },
        lastname: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        year: {
          type: String,
          required: true,
        },
        semester: {
          type: String,
          required: true,
        },
        tshirtSize: {
          type: String,
          required: true,
        },
        affiliation: {
          type: String,
          required: true,
        },
        dp: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('teams', teamSchema);
