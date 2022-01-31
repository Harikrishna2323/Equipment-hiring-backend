const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicles",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    bookedTimeSlots: {
      from: { type: String },
      to: { type: String },
    },
    totalHours: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    transactionId: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Booking", bookingSchema);
