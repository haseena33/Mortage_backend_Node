// import User from "../models/user.js";
// import nodemailer from "nodemailer";

// // Create a transporter object using your email service provider
// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "ila.johnson69@ethereal.email",
//     pass: "RbfrpF8UtqPrChUaqk",
//   },
// });

// const UserRegistationemail = async (req, res) => {
//   try {
//     const { firstname, lastname, email, phoneNumber, gender, maritalStatus, address, password, confirmPassword } = req.body;

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     // Store user details in the database
//     const user = await User.create({
//       firstname,
//       lastname,
//       email,
//       phoneNumber,
//       gender,
//       maritalStatus,
//       address,
//       password,
//       confirmPassword,
//     });

//     // Create the email content
//     const mailOptions = {
//       from: 'your-email@gmail.com', // Replace with your email
//       to: email,
//       subject: 'Welcome to Our Service!',
//     //   text: `Hello ${firstname} ${lastname},\n\nThank you for registering! Click the link below to access your dashboard:\n\nhttp://your-application-url/dashboard\n\nBest regards,\nYour Company`,
//       // You can also use HTML
//       html: `<p>Hello ${firstname} ${lastname},\n\n</p><p>Thank you for registering! \n\nClick the link below to access your dashboard:\n\n</p><p><a href="http://localhost:3000/leadfile">http://localhost:3000/leadfile</a></p>\n\nGo to Dashboard\n\n<p>Best regards,<br>Your Company</p>`,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);

//     // Respond with success message
//     return res.status(201).json({ message: "User registered successfully", user });
//   } catch (error) {
//     console.error('Error in UserRegistationemail:', error);
//     return res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     return res.status(200).json(users);
//   } catch (error) {
//     console.error('Error in getAllUsers:', error);
//     return res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

// export { UserRegistationemail, getAllUsers };

import User from "../models/user.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { v4 as uuidv4 } from 'uuid'; // Updated import statement


const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "	iliana.schuster@ethereal.email",
    pass: "PXywkY7AaUYbAMbjGk",
  },
});

const UserRegistationemail = async (req, res) => {
  try {
    const { firstname, lastname, email, phoneNumber, gender, maritalStatus, address, password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (token) {
      const user = await User.findOne({ where: { verificationToken: token } });
      if (user) {
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        return res.status(200).json({ message: "Email verified successfully" });
      } else {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
    } else {
         // Check if email already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const user = await User.create({
        id:uuidv4(),
        firstname,
        lastname,
        email,
        phoneNumber,
        gender,
        maritalStatus,
        address,
        password,
        confirmPassword,
        verificationToken,
        isVerified: false
      });

      const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Welcome to Our Service!',
        html: `<p>Hello ${firstname} ${lastname},</p>
               <p>Thank you for registering! Click the link below to verify your email:</p>
               <p><a href="http://localhost:3000/leadfile?token=${verificationToken}">Verify Email</a></p>
               <p>Best regards,<br>Your Company</p>`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(201).json({ message: "User registered successfully. Please check your email to verify your account." });
    }
  } catch (error) {
    console.error('Error in UserRegistationemail:', error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(uuidv4());
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export { UserRegistationemail, getAllUsers };
