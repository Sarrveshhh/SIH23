const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");

// send mail
router.post("/register", (req, res) => {
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: "rukshar120801@gmail.com",
      subject: email,
      html: "<h1>Disaster Alert</h1> <h1>This disaster is reported by Wadala Fire Station</h2><br/><h2>Urgent help required</h2>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    console.log("Error" + error);
    res.status(401).json({ status: 401, error });
  }
});

module.exports = router;
