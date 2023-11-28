const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const connectToDB = require("./db/connection");

const userRoute = require("./routes/user");

app.use(cors());
app.use(express.static("src/public"));

app.use(bodyParser.json());

connectToDB();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", userRoute);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Your app is listening on http://localhost:${listener.address().port}`
  );
});
