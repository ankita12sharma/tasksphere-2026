const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const UserRouter = require("./Routes/UserRoute");
const TaskRouter = require("./Routes/TaskRoute");
const PORT = 8666;

mongoose
  .connect(process.env.MONGO_CONN)
  .then(() => console.log(`MongoDB connected successfully!!`))
  .catch((err) => console.log(`Unable to connect to MongoDB!!`));

app.use(bodyParser.json());
app.use(cors());

app.use("/", TaskRouter);
app.use("/", UserRouter);

app.listen(PORT, () => {
  console.log(`Listening to server on PORT ${PORT}`);
});
