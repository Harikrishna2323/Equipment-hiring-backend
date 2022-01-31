const router = require("express").Router();
const {
  bookVehicle,
  getAllBookings,
} = require("../controllers/bookingController");
const { verify } = require("../utils/verify");

router.post("/book", verify, bookVehicle);

router.get("/getallbookings", verify, getAllBookings);

module.exports = router;
