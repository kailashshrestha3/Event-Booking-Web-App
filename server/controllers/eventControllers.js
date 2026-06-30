const Event = require("../models/Event");

exports.getAllEvents = async (req, res) => {
  try {
    const filters = {};
    if (req.query.category) {
      filters.category = req.query.category;
    }

    if (req.query.ticketPrice) {
      filters.ticketPrice = req.query.ticketPrice;
    }
    const events = await Event.find(filters);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEvent = async (req, res) => {
  const {
    title,
    description,
    date,
    location,
    category,
    totalSeats,
    ticketPrice,
    imageUrl,
  } = req.body;
  try {
    const event = await Event.create({
      title,
      description,
      date,
      location,
      category,
      totalSeats,
      availableSeats: totalSeats,
      ticketPrice,
      imageUrl,
    });
    res.status(201).json(event);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  const {
    title,
    description,
    date,
    location,
    category,
    totalSeats,
    ticketPrice,
    imageUrl,
  } = req.body;
  try {
    const update = {
      title,
      description,
      date,
      location,
      category,
      totalSeats,
      ticketPrice,
      imageUrl,
    };
    // If totalSeats is provided, update availableSeats to match it.
    if (typeof totalSeats !== "undefined") {
      update.availableSeats = totalSeats;
    }

    const event = await Event.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
