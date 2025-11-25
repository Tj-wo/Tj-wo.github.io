const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const contactRouter = require("./routes/contact");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 90,
});
app.use(limiter);

app.use("/api/contact", contactRouter);

app.get("/", (req, res) => res.send({ status: "ok" }));

module.exports = app;
