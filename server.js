const express = require("express");
const mainRouter = require("./Route/mainrt");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
const bd = require("body-parser");

app.use(cors());

dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE;
// console.log(process.env.DATABASE)

mongoose
  .connect(db, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connection successfull`);
  })
  .catch((err) => {
    console.log(`connection not Successful`);
  });

app.use(
  bd.urlencoded({
    extended: false,
  })
);
app.use(bd.json());
// app.use(urlParser);
app.use(mainRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", async (req, res) => {
  res.send("Hello World").status(200);
  console.log(req);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
