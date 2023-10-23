const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();  // <-- Load environment variables from .env file

const app = express();
const PORT = 8080;
// const Message = require('./models/message')
const productController = require('./models/productController'); 
const categoryController = require('./models/categoryController')
// Adjust the path to where your controller is located


// MongoDB connection URL - Loaded from the .env file
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/testDB';

// Connect to MongoDB
mongoose.connect("mongodb+srv://xiaoge:YTjlvY2Kh0agCl67@cluster0.5yttvdu.mongodb.net/")

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
});

mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to MongoDB:', err);
});

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});



// Routes
//app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.post('/products', productController.createProduct);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);
// Route to handle product queries by name
app.get('/products', (req, res) => {
    const name = req.query.name;
    if (name) {
         productController.searchProductsByName(req, res);
    } else {
        res.send('Please provide a product name using the "name" query parameter.');
    }
});
app.post('/categories', categoryController.createCategory)
// app.post('/message', async (req, res) => {
//     try {
//         const message = new Message({
//             content: req.body.content
//         });
//         await message.save();
//         res.status(201).send({ message: 'Message saved successfully!', data: message });
//     } catch (error) {
//         res.status(500).send({ message: 'Failed to save the message.', error: error.message });
//     }
// });


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
