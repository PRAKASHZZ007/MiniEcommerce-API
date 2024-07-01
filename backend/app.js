const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path =require("path");
dotenv.config({path:path.join(__dirname,"config","config.env")})
const connectDatabase =  require("./config/connectDatabase")

app.use(express.json());
const products = require("./routes/product.js")
const orders = require("./routes/order.js")
connectDatabase()
app.use("/api/v1",products)
app.use("/api/v1",orders)

app.listen(3000,()=>{
    console.log(`Server listening to port ${process.env.PORT} in production`)
})