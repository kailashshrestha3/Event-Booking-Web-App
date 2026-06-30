const Booking = require("../models/Bookings");
const OTP = require("../models/OTP");
const Event = require("../models/Event");
const { sendOtpEmail, sendBookingEmail } = require("../utils/email");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendBookingOTP = async (req, res) => {
  try {
    const otp = generateOTP();
    await OTP.findOneAndDelete({ email: req.user.email, action: 'event_booking' });
    await OTP.create({ email: req.user.email, otp, action: 'event_booking' });
    await sendOtpEmail(req.user.email, otp, 'event_booking');
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};

exports.bookEvent = async (req, res) => {
  try {
    const { eventId, otp } = req.body;

    // Verify OTP explicitly before proceeding
    const validOTP = await OTP.findOne({ email: req.user.email, otp, action: 'event_booking' });
    if (!validOTP) {
      return res.status(400).json({ message: 'Invalid or expired OTP for booking' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableSeats <= 0) {
      return res
        .status(400)
        .json({ message: "Event is fully booked. No seats available" });
    }

    const existingBooking = await Booking.findOne({
      userId: req.user.id,
      eventId,
    });
    if (existingBooking && existingBooking.status !== 'cancelled') {
      return res.status(400).json({ message: 'Already booked or pending' });
    }

    const booking = await Booking.create({
      userId: req.user._id,
      eventId,
      status: "pending",
      paymentStatus: "non_paid",
      amount: event.ticketPrice,
    });

    // console.log(
    //   eventId,
    //   req.user._id,
    //   event.ticketPrice,
    //   req.user.name,
    //   event.title,
    // );

    await OTP.deleteMany({ email: req.user.email, action: "event_booking" });
    await sendBookingEmail(req.user.email, req.user.name, event.title);

    res.status(201).json({
      message: "Booking created. Please check your email for further details",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    console.log("Payment Status received:", paymentStatus);
    console.log("Type:", typeof paymentStatus);
    if (!["paid", "non_paid"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    console.log(req.params.id);

    const booking = await Booking.findById(req.params.id)
      .populate("eventId")
      .populate("userId");  // get booking owner info

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "confirmed") {
      return res.status(400).json({ message: "Booking already confirmed" });
    }

    const event = booking.eventId;  // use populated event

    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: "Event is fully booked. No seats available" });
    }

    booking.status = "confirmed";
    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
    }
    await booking.save();

    event.availableSeats -= 1;
    await event.save();

    // Send email to booking OWNER, not admin
    await sendBookingEmail(booking.userId.email, booking.userId.name, event.title);

    res.status(200).json({ message: "Booking confirmed" });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate(
      "eventId",
    );
    res.status(200).json(bookings);
    console.log(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (
    booking.userId.toString() !== req.user._id.toString() &&
    req.user.role !== 'admin'
  ) {
    return res.status(403).json({ message: "You are not authorized to cancel this booking" });
  }
  const previousStatus = booking.status;
  booking.status = "cancelled";
  await booking.save();

  if (previousStatus === "confirmed") {
    const event = await Event.findById(booking.eventId._id);
    event.availableSeats += 1;
    await event.save();
  }

  res.status(200).json({ message: "Booking cancelled" });
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("eventId")
      .populate("userId", "name email");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};
