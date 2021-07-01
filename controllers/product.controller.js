const Product = require("../models/Product");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(400).send({
        status: "FAIL",
        message: "No product.",
      });
    }
    return res.status(200).send({
      status: "OK",
      message: "Access successful products",
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { name, description } = req.body;
    if (name === "" || name === null || name === undefined) {
      return res.status(400).send({
        status: "FAIL",
        message: "Name is not empty.",
      });
    }
    if (
      description === "" ||
      description === null ||
      description === undefined
    ) {
      return res.status(400).send({
        status: "FAIL",
        message: "Description is not empty.",
      });
    }
    const newProduct = new Product({
      name,
      description,
    });
    await newProduct.save();
    return res.status(200).send({
      status: "OK",
      message: "Create successful product.",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description } = req.body;
    if (name === "" || name === null || name === undefined) {
      return res.status(400).send({
        status: "FAIL",
        message: "Name is not empty.",
      });
    }
    if (
      description === "" ||
      description === null ||
      description === undefined
    ) {
      return res.status(400).send({
        status: "FAIL",
        message: "Description is not empty.",
      });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).send({
        status: "FAIL",
        message: "Product is not found.",
      });
    }

    product.name = name;
    product.description = description;

    await product.save();
    return res.status(200).send({
      status: "OK",
      message: "Update successful product.",
    });
  } catch (error) {
    console.log(error);
  }
};
