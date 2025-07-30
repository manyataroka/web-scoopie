const express = require("express");
const { testConnection: connection } = require("./Database/db");
const router = require("./routes/authRoutes.js");
const cartRouter = require("./routes/cartRoutes.js");
const cors = require("cors");
const app = express();
const PORT = 5002;

// CORS setup
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

// Body parser middleware
app.use(express.json()); // Parses application/json
app.use(express.urlencoded({ extended: true })); // Parses application/x-www-form-urlencoded

// Routes
app.use("/api/auth", router);
app.use("/api/cart", cartRouter);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
