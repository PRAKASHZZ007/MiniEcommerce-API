const mongoose = require('mongoose');
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

// Create Order - /api/v1/order
exports.createOrder = async (req, res, next) => {
    console.log(req.body, "DATA");
    const cartItems = req.body;
    const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2);
    console.log(amount, "AMOUNT");
    const status = "pending";
    const order = await orderModel.create({ cartItems, amount, status });

    // Updating product stock
    cartItems.forEach(async (item) => {
        try {
            const productIdString = item.product._id.$oid; // Extracting the ObjectId string
            const productId = new mongoose.Types.ObjectId(productIdString); // Correct conversion to ObjectId
            const product = await productModel.findById(productId);
            if (product) {
                product.stock -= item.qty;
                await product.save();
            } else {
                console.error(`Product with ID ${productId} not found`);
            }
        } catch (error) {
            console.error(`Invalid product ID: ${item.product._id}`, error);
        }
    });

    res.json({
        success: true,
        order,
    });
};
