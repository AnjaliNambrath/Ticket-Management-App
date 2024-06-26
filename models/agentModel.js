var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

/**
 * Agent Schema
 */
var AgentSchema = new Schema({
  agentID: {
    type: Number,
    trim: true,
    required: true,
    unique: true,
  },
  agentName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

AgentSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model("Agent", AgentSchema);
