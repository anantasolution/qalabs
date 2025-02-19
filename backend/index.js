import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoute from "./routes/auth.js";
import adminRoute from "./routes/admin.js";
import contactRoutes from "./routes/contact.js";
import consulationRoutes from "./routes/consulation.js";
import blogRoutes from "./routes/blog.js";
import categoryRoutes from "./routes/category.js";
import newsLetterRoutes from "./routes/newsletter.js";
import mailRoute from "./routes/mail.js";
import feedbackRoutes from "./routes/feedback.js";
import projectRoutes from "./routes/project.js";

// Get the current file's path
const __filename = fileURLToPath(import.meta.url);

// Get the current directory's path
const __dirname = path.dirname(__filename);

// For importing routes

// App configuration
const port = process.env.PORT || 8040;

dotenv.config();

const app = express();

// Serve static files from the uploads directory
// app.use(
//   "/uploads/partner/logo",
//   express.static(path.join(__dirname, "uploads/partner/logo"))
// );

// app.use(
//   "/uploads/company/logo",
//   express.static(path.join(__dirname, "uploads/company/logo"))
// );

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads/blog/photos"))
);

app.use(
  "/projectuploads",
  express.static(path.join(__dirname, "uploads/project/photos"))
);


app.use(
  "/feedbackuploads",
  express.static(path.join(__dirname, "uploads/feedback/photos"))
);

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://zyinex.stylic.ai",
      "https://zyinexadmin.stylic.ai"
    ];
    // Allow requests with no origin (like mobile apps or CURL)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
  credentials: true,
};

app.options("*", cors(corsOptions)); // Allow OPTIONS for all routes

// Middleware for using CORS
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json({ limit: "50mb" }));

// Middleware to read cookies data
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    throw err;
  }
};

app.get("/", (req, res) => {
  res.send("Bahut maza aa raha hai 🥳");
});

// Notify MongoDB connection status
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Middleware
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/contact", contactRoutes);
app.use("/api/consulation", consulationRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/newsletter", newsLetterRoutes);
app.use("/api/mail", mailRoute);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/project", projectRoutes);

// Middleware to catch errors
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong!";

  return res.status(errStatus).json({
    success: "false",
    status: errStatus,
    message: errMsg,
    stack: err.stack,
  });
});

app.listen(port, () => {
  connectDb();
  console.log(`App is listening on port: ${port}`);
});
