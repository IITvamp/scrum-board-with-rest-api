const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://User1:user123@cluster0.zbqd2.mongodb.net/scrumBoard?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then((res) => console.log("conneceted"))
  .catch((err) => console.log("error occured" + err));

const listRoute = require("./api/routes/list");
const cardRoute = require("./api/routes/card");

app.use("/list", listRoute);
app.use("/cards", cardRoute);

app.listen(8011);
