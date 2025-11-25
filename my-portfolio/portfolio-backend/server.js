require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const contactRouter = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// basic rate limiter for all requests
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 90, // limit each IP to 90 requests per windowMs
});
app.use(limiter);

// contact route
app.use("/api/contact", contactRouter);

app.get("/", (req, res) => res.send({ status: "ok" }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
