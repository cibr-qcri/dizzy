const mongoose = require('mongoose');

const StatisticSchema = new mongoose.Schema(
  {
    computed: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['batch', 'realtime'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Statistic', StatisticSchema);
