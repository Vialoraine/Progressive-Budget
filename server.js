const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// api route
app.use(require("./routes/api.js"));
// html route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});


app.listen(PORT, () => {
  console.log(`🌍 App listening on http://localhost:${PORT}`);
});