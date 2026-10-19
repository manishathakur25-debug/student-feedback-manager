
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Feedback from "./feedback.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.join(__dirname, "../frontend");

app.use(cors());
app.use(express.json());
app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB error:", error.message);
  });

app.post("/feedback", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const newFeedback = new Feedback({
      name,
      rating: Number(rating),
      comment
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback saved successfully",
      feedback: newFeedback
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Failed to save feedback"
    });
  }
});

app.get("/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Failed to fetch feedback"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
