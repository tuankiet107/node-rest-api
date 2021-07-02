const express = require("express");
const app = express();
const PORT = 5000;
const ConnectDB = require("./configs/db");
const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");
const authMiddleware = require("./middlewares/users.middleware");

ConnectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/api/products", authMiddleware, productRoute);
app.use("/v1/api/auth", authRoute);

try {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
} catch (error) {
  console.log("Error starting server", error);
  process.exit(1);
}
