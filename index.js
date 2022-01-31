const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

const PORT = process.env.PORT || 4220;

const vehicleRouter = require("./routes/vehicle");
const authRouter = require("./routes/auth");
const bookingRouter = require("./routes/bookings");

//mongoose connection
mongoose.connect(`${process.env.MONGO_URL}`, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;
connection.on("connected", () => console.log("MongoDB connection successful."));
connection.on("error", () => console.log("MongoDB connection error."));

app.use("/api/auth", authRouter);
app.use("/api/vehicles", vehicleRouter);
app.use("/api/bookings", bookingRouter);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
