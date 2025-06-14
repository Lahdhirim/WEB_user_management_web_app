const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  company_id: { type: Number, required: true, min: 100000, max: 999999 },
  position: { type: String, required: true },
  join_date: { type: Date, default: Date.now },
  read_permission: { type: Boolean, default: false },
  edit_permission: { type: Boolean, default: false },
  deploy_permission: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);
