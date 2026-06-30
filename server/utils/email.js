const nodemailer = require("nodemailer");

exports.sendBookingEmail = async (userEmail, username, eventTitle) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // ✅ explicit host
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Booking Confirmed for ${eventTitle}`,
      html: `
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; font-family: Arial, sans-serif;">
          <h1 style="color: #333; font-size: 24px;">Booking Confirmed</h1>
          <p style="color: #555; font-size: 16px;">Hello ${username},</p>
          <p style="color: #555; font-size: 16px;">Your booking for ${eventTitle} has been confirmed.</p>
          <p style="color: #555; font-size: 16px;">We look forward to seeing you at the event!</p>
        </div>`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Booking email sent to ${userEmail}`);
  } catch (error) {
    console.log(error); // ✅ always log errors, never leave catch empty
  }
};

exports.sendOtpEmail = async (userEmail, otp, type) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // ✅ explicit host
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const title =
      type === "account_verification"
        ? "Account Verification"
        : "Event Booking";
    const msg =
      type === "account_verification"
        ? "Verify your account"
        : "Book your event";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: title,
      html: `
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; font-family: Arial, sans-serif;">
          <h1 style="color: #333; font-size: 24px;">${title}</h1>
          <p style="color: #555; font-size: 16px;">${msg}</p>
          <p style="color: #555; font-size: 16px;">Your OTP is: <strong>${otp}</strong></p>
        </div>`, // ✅ closing div was missing in your original!
    };
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${userEmail} for ${type}`);
  } catch (error) {
    console.log(`Error sending OTP email to ${userEmail} for ${type}:`, error);
  }
};
