const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();



const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error(" MONGO_URI is not defined in .env");
  process.exit(1);
}


app.use(
  cors({
    origin: "https://resplendent-khapse-f0c270.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());



// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend working ",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


app.use((err, req, res, next) => {
  console.error(" Error:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB Connected");

    const server = app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

    /* Graceful Shutdown */
    process.on("SIGINT", async () => {
      console.log("Shutting down server...");

      await mongoose.connection.close();

      server.close(() => {
        console.log(" Server closed successfully");
        process.exit(0);
      });
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err.message);
    process.exit(1);
  });
