import OTP from "../models/Otp.js";

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Find OTP record in the database
    const otpRecord = await OTP.findOne({ where: { email, otp } });

    if (otpRecord) {
      const otpCreationTime = new Date(otpRecord.createdAt).getTime();
      const currentTime = new Date().getTime();

      // Check if OTP is expired (e.g., 5 minutes validity)
      if (currentTime - otpCreationTime < 5 * 60 * 1000) { // 5 minutes in milliseconds
        await OTP.destroy({ where: { email } }); // Delete OTP after successful verification
        return res.status(200).json({ message: 'OTP verified successfully!' });
      } else {
        return res.status(400).json({ message: 'OTP has expired' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { verifyOtp };
