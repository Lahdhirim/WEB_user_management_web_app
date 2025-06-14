const express = require("express");
const cors = require("cors");
const connectDB = require("./configurations");
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();

app.use(cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

app.use("/api", userRoutes);

app.listen(8001, () => console.log(`Server running on http://localhost:8001`));