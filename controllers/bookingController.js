const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
const { v4: uuidv4 } = require("uuid");

exports.bookVehicle = async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const booking = await Booking.create(req.body);
      const vehicle = await Vehicle.findOne({ _id: req.body.vehicle });
      console.log(req.body.car);
      vehicle.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await vehicle.save();

      res.status(201).json({
        message: "Booking has been confirmed.",
        booking,
      });
    } else {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("vehicle");
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};
