const express = require("express");
const app = express();
const PORT = 5000;
const ConnectDB = require("./configs/db");
const productRoute = require("./routes/product");

ConnectDB();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("Hello Techbase Vietnam");
console.log("Hello Tuan Kiet");
console.log("Hello Minh Chien");

app.use("/v1/api/products", productRoute);

try {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
} catch (error) {
  console.log("Error starting server", error);
  process.exit(1);
}
