const Vehicle = require("../models/Vehicle");

exports.createVehicle = async (req, res) => {
  const { name, type, capacity, image, fuelType, bookedSlots, rent } = req.body;
  try {
    // const existing = await Vehicle.find({ name: name });
    // console.log(existing);
    // if (existing) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Vehicle already exists.",
    //   });
    // }
    const newVehicle = new Vehicle({
      name,
      type,
      capacity,
      image,
      fuelType,
      bookedSlots,
      rent,
    });
    const vehicle = await newVehicle.save();

    res.status(201).json({
      message: "New Vehicle Created",
      vehicle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllVehicle = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json({
      length: vehicles.length,
      vehicles,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error,
    });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    await Vehicle.findOneAndDelete({ _id: req.body.vehicleid });
    res.send("Vehicle deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.editVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.body._id });
    vehicle.name = req.body.name;
    vehicle.image = req.body.image;
    vehicle.fuelType = req.body.fuelType;
    vehicle.rent = req.body.rent;
    vehicle.capacity = req.body.capacity;

    await vehicle.save();

    res.status(200).json({ message: "Vehicle details updated successfully" });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong.",
    });
  }
};
