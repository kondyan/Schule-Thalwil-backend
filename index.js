require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const usersRouter = require("./src/routes/users");
const authRouter = require("./src/routes/auth");
const categoriesRouter = require("./src/routes/categories");

const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(logger("short"));

app.use(express.json());

app.use("/files", express.static(path.join(__dirname, "src", "uploads")));

app.use("/users", usersRouter);

app.use("/auth", authRouter);

app.use("/categories", categoriesRouter);

app.use((req, resp) => {
  resp.status(404).json({ message: "not found" });
});

app.use((err, req, resp, next) => {
  const { status = 500, message = "server error" } = err;
  resp.status(status).json({ message });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log("server started at port 3000");
    });
  })
  .catch((err) => console.log(err));
