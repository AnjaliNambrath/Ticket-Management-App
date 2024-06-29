var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

/**
 * Ticket Schema
 */
var TicketSchema = new Schema(
  {
    ticketID: {
      type: Number,
      trim: true,
      required: true,
      unique: true,
    },
    issue: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    customerID: 
    { type: Schema.Types.ObjectId, ref: "Customer" },
    assignedTo: 
    { type: Schema.Types.ObjectId, ref: "Agent" },
    priority: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    New_Notification: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);


module.exports = mongoose.model("Ticket", TicketSchema);
