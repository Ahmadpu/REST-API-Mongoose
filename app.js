const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productsRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders');
// MongoDB connection
mongoose.connect('mongodb+srv://node-rest:<password>@node-rest-shop.b6c66.mongodb.net/<node-rest-shop>?retryWrites=true&w=majority',{
useMongoClient : true
})

//Morgan third-party middleware
app.use(morgan('dev'));

// bodyparser 

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// headers handling cors error.

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested with, Content-Type, Accept, Authorization',
    {
        useMongoClient : true
    });
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

//Routes which handles requests
app.use('/products' , productsRoutes);
app.use('/orders' , ordersRoutes);

// Handling Error
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})
app.use((error,req,res,next) => {
    res.status(error.status || 500).json({
        error: error.message
    });
});
module.exports = app;