const router = require("express").Router();
const {
  createVehicle,
  getAllVehicle,
  deleteVehicle,
  editVehicle,
} = require("../controllers/vehicleController");
const { verify, isAdmin } = require("../utils/verify");

router.post("/create", verify, isAdmin, createVehicle);

router.get("/get-vehicles", getAllVehicle);

router.post("/editvehicle", verify, isAdmin, editVehicle);

router.post("/deletevehicle", verify, isAdmin, deleteVehicle);

module.exports = router;
