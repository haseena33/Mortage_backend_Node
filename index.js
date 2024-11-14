// // import express, { json } from "express";
// // import userRouter from "./src/routes/user.routes.js";
// // import cors from "cors";
// // import sequelize from "./src/config/config.js"; 

// // const app = express();
// // app.use(cors());
// // app.use(json());
// // app.use('/api/users', userRouter);

// // sequelize.sync({ force: false })
// //   .then(() => {
// //     console.log("All models were synchronized successfully.");
// //   })
// //   .catch((err) => {
// //     console.error("An error occurred while synchronizing models:", err);
// //   });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });


// import express, { json } from "express";
// import userRouter from "./src/routes/user.routes.js";
// import cors from "cors";
// import sequelize from "./src/config/config.js";
// import multer from "multer";
// import path from "path";

// const app = express();
// app.use(cors());
// app.use(json());

// const uploadFolder = 'C:/Users/DELL/Desktop/Documentsstore';

// // Set up multer for file storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadFolder);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // Save with the original file name
//     }
// });

// // File upload route
// const upload = multer({ storage: storage });

// app.post('/upload', upload.fields([
//   { name: 'payslip', maxCount: 1 },
//   { name: 'bankStatement', maxCount: 1 }
// ]), (req, res) => {
//   console.log(req.files);
//   res.send('Files uploaded successfully');
// });


// // User routes
// app.use('/api/users', userRouter);

// sequelize.sync({ force: false })
//   .then(() => {
//     console.log("All models were synchronized successfully.");
//   })
//   .catch((err) => {
//     console.error("An error occurred while synchronizing models:", err);
//   });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


import express, { json } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import sequelize from "./src/config/config.js";
import userRouter from "./src/routes/user.routes.js";

const app = express();
app.use(cors());
app.use(json());

const uploadFolder = 'C:/Users/DELL/Desktop/Documentsstore';

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save with the original file name
    }
});

const upload = multer({ storage: storage });

// Route for uploading payslip
app.post('/upload/payslip', upload.single('payslip'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    console.log('Payslip file:', req.file);
    res.send('Payslip uploaded successfully');
});

// Route for uploading bank statement
app.post('/upload/bankStatement', upload.single('bankStatement'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    console.log('Bank Statement file:', req.file);
    res.send('Bank Statement uploaded successfully');
});

// User routes
app.use('/api/users', userRouter);

sequelize.sync({ force: false })
  .then(() => {
    console.log("All models were synchronized successfully.");
    
  })
  .catch((err) => {
    console.error("An error occurred while synchronizing models:", err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
