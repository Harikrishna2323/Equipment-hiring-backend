const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["car", "bike"],
    },
    image: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["petrol", "diesel"],
    },
    capacity: {
      type: Number,
      required: true,
    },
    bookedSlots: [
      {
        from: {
          type: String,
          required: true,
        },
        to: {
          type: String,
          required: true,
        },
      },
    ],
    rent: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("vehicles", vehicleSchema);
