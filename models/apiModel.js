const mongoose = require("mongoose");

const apiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("API", apiSchema);
