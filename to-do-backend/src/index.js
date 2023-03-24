import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import TodoRoute from './routes/todo.route.js'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend has started working");
});

app.use("/", TodoRoute)

app.listen(4000, async () => {
  console.log("Server has started");
  mongoose.set("strictQuery", false);
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(
      process.env.DB_CONNECTION_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    console.log("connect to Database");
  } catch (err) {
    console.log(err);
  }
});
