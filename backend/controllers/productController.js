const productModel = require("../models/productModel");

// get products api - /api/v1/products
exports.getProducts = async (req, res, next) => {
    const products = await productModel.find({});

    res.json({
        success: true,
        products
    });
}

// get single product api - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    try{
 const product = await productModel.findById(req.params.id); 
 res.json({
    success: true,
    product
});
    }catch(error){
        res.status(404).json({
            success: false,
            message:error.message
        });
    }
}
