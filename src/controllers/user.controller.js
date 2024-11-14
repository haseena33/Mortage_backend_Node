// // user.controller.js
// import User from "../models/user.js";
// import { v4 as uuidv4 } from 'uuid'; // Updated import statement

// const UserRegister = async (req, res) => {
//   console.log(uuidv4(), "**************");
//   try {
//     const { firstname, lastname, email, phoneNumber, gender, maritalStatus, address, password, confirmPassword } = req.body;

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }
    
//     const newId = uuidv4()
//     const user = await User.create({
//       id: newId, // Updated UUID generation
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

//     if (Id === null) {
//       return res.status(400).json({ message: "ID is Null" });
//     }

//     console.log(user, "**************");
//     return res.status(201).json({ message: "User registered successfully", user });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll();
//     return res.status(200).json("newId");
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export { UserRegister, getAllUsers };
