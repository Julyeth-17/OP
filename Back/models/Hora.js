const mongoose = require("mongoose");

const TimeZoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  });

  module.exports = mongoose.model("Timezone", TimeZoneSchema);
