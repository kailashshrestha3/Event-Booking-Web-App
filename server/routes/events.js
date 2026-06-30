const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMware");

const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventControllers");

//Get All Events
router.get("/", getAllEvents);

//Get Event By Id
router.get("/:id", getEventById);

//Create Event (Admin Only)
router.post("/", protect, admin, createEvent);

//Update Event (Admin Only)
router.put("/:id", protect, admin, updateEvent);

//Delete Event (Admin Only)
router.delete("/:id", protect, admin, deleteEvent);

module.exports = router;
