
    const express = require('express');
    const router = express.Router();
    const mongoose = require('mongoose');
    const product = require('../models/product');

    const Product = require('../models/product');

    // router.get('/about',(req,res,next) => {
    //     res.status(200).json({
    //         message: 'handling GET requests to /products/about'
    //     })
    // });
    // router.get('/',(req,res,next) => {
    //     Product.find()
    //         .exec()
    //         .then(docs => {
    //             console.log(docs);
    //             if(docs.length >= 0){
    //                 res.status(200).json(docs);
    //             }else{
    //                 res.status(404).json({
    //                     message : 'No Entries found'
    //                 })
    //             }
    //             res.status(200).json(docs);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json({
    //                 error : err
    //             })
    //         });
    //     res.status(200).json({
    //     message: 'handling GET requests to /products/home'
    //     })
    // });


    router.post('/',(req,res,next) => {
        const product = new Product({
            _id : new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        });
        product.save().then(result =>{
            console.log(result);
        })
        .catch(err => console.log(err));
        res.status(201).json({
            message : 'Handling Post request to /product',
            createdProduct : product
        });
    });
    router.get('/:productId',(req,res,next)=> {
        const id=req.params.productId;
        Product.findById(id)
        .exec()
        .then(doc => { 
            console.log("From database", doc);
            if(doc){
                res.status(200).json(doc);
            }else{
                res.status(404).json({message : 'No Valid entry found for provied ID'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err})
        });
    });
    router.patch('/:productId',(req,res,next) => {
        const id= req.params.productId;
        const updateOps = {};
        for(const ops of req.body){
            updateOps[ops.propName] = ops.value;
        }
        product.update({ _id : id},{$set: updateOps })    
        .exec()
        .then(result =>{
            console.log(result );
            res.status(200).json(result); 
        })
    });
    router.delete('/:productId',(req,res,next)=>{
        const id= req.params.productId;
        Product.remove({_id : id});
    })

    // router.delete();
    // router.post('/:productId',(req,res,next) => {
        
    //     const id = req.params.productId;
    //     if(id=== 'postid'){
    //         res.status(200).json({
    //             message: 'This is post request with productId'
    //         });
    //     }else{
    //         res.status(200).json({
    //         message: 'This is post request with other id instead postid'
    //         });
    //     }

    // });
    // router.get('/:productId',(req,res,next) => {
    //     const id = req.params.productId;
    //     if(id === 'special'){
    //         res.status(200).json({
    //             message: 'You discovered special id'
    //         });
    //     }else{
    //         res.status(200).json({
    //             message: 'discovered others id'
    //         });
    //     }
    // })
    module.exports = router;