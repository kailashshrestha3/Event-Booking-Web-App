const OTP = require("../models/OTP");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { sendOtpEmail } = require("../utils/email");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register a user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
    });
    await user.save();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`OTP for ${email} : ${otp}`);

    await OTP.create({ email, otp, action: "account_verification" });

    await sendOtpEmail(email, otp, "account_verification");

    res.status(201).json(
      {
        message:
          "User registered successfully. Please check your email for verification",
        email: user.email,
      },
      user,
    );
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error:", error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  if (!user.isVerified && user.role === "user") {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.deleteMany({ email, action: "account_verification" }); //remove previous otp
    await OTP.create({ email, otp, action: "account_verification" });
    await sendOtpEmail(email, otp, "account_verification");
    return res.status(400).json({
      message: "Account not verified. A new OTP has been sent to your email",
    });
  }

  res.json({
    message: "Login successful",
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  });
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const otpRecord = await OTP.findOne({
    email,
    otp,
    action: "account_verification",
  });

  if (!otpRecord) {
    return res.status(400).json({ message: "Invalid or exprired OTP" });
  }

  const user = await User.findOneAndUpdate(
    { email },
    { isVerified: true },
    {
      new: true,
    },
  );
  await OTP.deleteMany({ email, action: "account_verification" });
  res.json({
    message: "Account verified successfully. You can now login",
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  });
};
module.exports = {
  registerUser,
  loginUser,
  verifyOtp,
};
