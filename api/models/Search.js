const mongoose = require('mongoose');

const SearchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    filter: {
      type: Object,
      default: {},
    },
    source: {
      type: String,
      required: true,
      enum: ['web', 'images'],
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

module.exports = mongoose.model('Search', SearchSchema);
