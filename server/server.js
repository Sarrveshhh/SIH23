// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cors from "cors";
// import express from "express";
// import dotenv from "dotenv";

// const PORT = 5000;

// const app = express();
// dotenv.config();
// const router = require("./Router/routes");

// // app.use(bodyParser.json({ limit: "30 mb", extended: true }));
// // app.use(bodyParser.urlencoded({ limit: "30 mb", extended: true }));
// app.use(express.json());
// app.use(cors());
// app.use(router);

// app.get("/server", (req, res) => {
//   res.send("server started");
// });

// // mongoose
// //   .connect(process.env.CONNECTION_URL, {
// //     useNewURLParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() =>
// //     app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
// //   )
// //   .catch((error) => console.log(error.message));

// app.listen(PORT, () => {
//   console.log(`Server running on port: ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./Router/routes");
const em = require("./Router/emailConfig");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8004;

// middle ware
app.use(express.json());
app.use(cors());
app.use(router);
app.use(bodyParser());

app.listen(port, () => {
  console.log(`server start at port no :${port}`);
});
