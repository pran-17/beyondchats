import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import articleRoutes from "./routes/articleroutes.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/beyondchats")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/articles", articleRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
