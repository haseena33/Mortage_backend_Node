import User from "../models/user.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import OTP from "../models/Otp.js";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ila.johnson69@ethereal.email",
    pass: "RbfrpF8UtqPrChUaqk",
  },
});

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP in the database
    await OTP.upsert({ email, otp });

    // Send OTP email
    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP:", error);
        return res
          .status(500)
          .json({ message: "Error sending OTP. Please try again." });
      }
      console.log("OTP sent:", info.response);
      res.status(200).json({ message: "Login successful, OTP sent to email" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { loginUser };
