import LeadDetails from "../models/LeadDetails.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import User from "../models/user.js";
export const getAllLeadDetails = async (req, res) => {
  try {
    const leads = await LeadDetails.findAll();
    res.json(leads);
  } catch (error) {
    console.error('Error fetching lead details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateLeadDetail = async (req, res) => {
    try {
      const { id } = req.params;
      const { fullName, leadSource, email, mobileNumber, annualIncome, noOfKids, partnersIncome, carLoan, savings, creditCardLimit, loanAmount, propertyValue } = req.body;
  
      if (!fullName || !email || !mobileNumber) {
        return res.status(400).json({ message: 'Required fields are missing' });
      }
  
      const [updated] = await LeadDetails.update({
        fullName,
        leadSource,
        email,
        mobileNumber,
        annualIncome,
        noOfKids,
        partnersIncome,
        carLoan,
        savings,
        creditCardLimit,
        loanAmount,
        propertyValue
      }, {
        where: { id }
      });
  
      if (updated) {
        const updatedLead = await LeadDetails.findOne({ where: { id } });
        res.status(200).json(updatedLead);
      } else {
        res.status(404).json({ message: 'Lead not found' });
      }
    } catch (error) {
      console.error('Error updating lead detail:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
export const getLeadById = async (req, res) => {
    try {
      const { id } = req.params;
      const lead = await LeadDetails.findOne({ where: { id } });
      
      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' });
      }
      
      res.json(lead);
    } catch (error) {
      console.error('Error fetching lead details by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export const createLeadDetail = async (req, res) => {
    try {
      const { fullName, leadSource, email, mobileNumber, annualIncome, noOfKids, partnersIncome, carLoan, savings, creditCardLimit, loanAmount, propertyValue } = req.body;
  
      if (!fullName || !email || !mobileNumber) {
        return res.status(400).json({ message: 'Required fields are missing' });
      }
      
      const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(400).json({ message: 'No user found with this email' });
    }

    // Check if a lead with the same email already exists
    const existingLead = await LeadDetails.findOne({ where: { email } });

    if (existingLead) {
      return res.status(400).json({ message: 'Lead with this email already exists' });
    }

      // Create a new lead detail
      const newLead = await LeadDetails.create({
        fullName,
        leadSource,
        email,
        mobileNumber,
        annualIncome,
        noOfKids,
        partnersIncome,
        carLoan,
        savings,
        creditCardLimit,
        loanAmount,
        propertyValue
      });
  
      // Set up the nodemailer transporter
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: 'iliana.schuster@ethereal.email',
          pass: 'PXywkY7AaUYbAMbjGk'
  }
      });
  
      // Email options
      let mailOptions = {
        from: 'your-email@example.com',
        to: email,
        subject: 'Lead Details Submission',
        html: `
          <h3>Hello ${fullName},</h3>
          <p>Thank you for submitting your lead details.</p>
          <p>If you want to edit your details, please click on the button below:</p>
                <a href="http://localhost:3000/editlead/${newLead.id}" style="display:inline-block;padding:10px 20px;margin:10px 0;color:white;background-color:blue;text-decoration:none;border-radius:5px;">Edit Details</a>
          <p>If you want to cancel, please click on the button below:</p>
          <a href="https://www.example.com/cancel-lead/${newLead.id}" style="display:inline-block;padding:10px 20px;margin:10px 0;color:white;background-color:red;text-decoration:none;border-radius:5px;">Cancel</a>
          <p>Best regards,</p>
          <p>Your Company</p>
        `
      };
  
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          // Log the specific error and include it in the response if necessary
          // Note: Do not expose sensitive error details in production
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
      res.status(201).json(newLead);
    } catch (error) {
      console.error('Error creating lead detail:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const getUserAndLeadDetailsById = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Fetching user with ID:", id); // Add this line
  
      const user = await User.findOne({
        where: { id }
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log("User found:", user); // Add this line
  
      const leadDetails = await LeadDetails.findOne({
        where: { email: user.email }
      });
  
      if (!leadDetails) {
        return res.status(404).json({ message: 'Lead details not found' });
      }
  
      return res.status(200).json({
        user,
        leadDetails
      });
  
    } catch (error) {
      console.error('Error fetching user and lead details by ID:', error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  