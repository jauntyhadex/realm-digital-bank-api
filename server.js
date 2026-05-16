const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const customerRoutes = require("./routes/customerRoutes");

const transferRoutes = require("./routes/transferRoutes");

const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/customers", customerRoutes);

app.use("/api/transfers", transferRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);


app.get("/", (req, res) => {
  res.send("My Bank API is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});