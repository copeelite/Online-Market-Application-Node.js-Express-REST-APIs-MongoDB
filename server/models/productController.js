


const Product = require("./product"); 
const productController = {};

// Fetch All Products
productController.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a Single Product by ID
productController.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a New Product
productController.createProduct = async (req, res) => {
  try {
    //         const message = new Message({ content: req.body.content });
//         await message.save();
//         res.status(201).send({ message: 'Message saved successfully!', data: 
    console.log("Received request to create product:", req.body);
    const product = new Product(req.body);
    console.log("Product instance created:", product);
    await product.save();
    console.log("Product saved successfully.");
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Product by ID
productController.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Product by ID
productController.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete All Products
productController.deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: "All products deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

productController.searchProductsByName = async (req, res) => {
  try {
    if (req.query.name) {
      const keyword = req.query.name;
      const products = await Product.find({
        name: { $regex: new RegExp(keyword, 'i') }
      });
      
      if (!products.length) {
        return res.status(404).json({ message: `No products found containing the keyword: ${keyword}` });
      }
      return res.json(products);
    }

    return res.status(400).json({ message: "Please provide a 'name' keyword in the query to search for products." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};








module.exports = productController;
