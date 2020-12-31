
    const express = require('express');
    const router = express.Router();
    const mongoose = require('mongoose');
    const product = require('../models/product');
    const multer = require('multer');
    const path = require('path');
    const storage = multer.diskStorage({
        destination: function(req,file,cb){
            cb(null, 'uploads')
        },
        filename : function(req,file,cb){
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    const fileFilter = (req,file,cb)=>{
       if(file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png')
        {cb(null,true);}
       //reject a file
       else{cb(null,true);}
        
    };

    const upload = multer({storage : storage, limits: {
        fileSize : 1024 * 1024 * 5 
    }});

    const Product = require('../models/product');

    // router.get('/about',(req,res,next) => {
    //     res.status(200).json({
    //         message: 'handling GET requests to /products/about'
    //     })
    // });
    router.get('/',(req,res,next) => {
        Product.find()
            .select("name price _id productImage")
            .exec()
            .then(docs => {
                const response = {
                    count : docs.length,
                    products: docs.map(doc => {
                        return{
                            name : doc.name,
                            price : doc.price,
                            productImage : doc.productImage,
                            _id : doc._id,
                            request:{
                                type : 'GET',
                                url : 'http://localhost:3000/products/' + doc._id
                            }
                        }
                    })
                }
                // console.log(docs);
                // if(docs.length >= 0){
                    res.status(200).json(response);
                // }else{
                //     res.status(404).json({
                //         message : 'No Entries found'
                //     })
                // }
        //     res.status(200).json(docs);
          })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error : err
                })
        });
    //     res.status(200).json({
    //     message: 'handling GET requests to /products/home'
    //     })
    });
    router.get('/products',(req,res,next)=>{
        Product.products()
        
    })

    router.post('/',upload.single('productImage'),(req,res,next) => {
       
        const product = new Product({
            _id : new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            productImage : req.file.path
        });
        product
            .save()
            .then(result =>{
                console.log(result);
                res.status(201).json
                    {
                    message : "created object successfully"
                    createdProduct : {
                        name : result.name
                        price : result.price
                        _id : result._id
                        request:{
                            type : 'POST'
                            url : 'http://localhost:3000/products/' + doc._id
                        }
                    } 
                }
            })
            .catch(err => console.log(err));
        res.status(201).json({
            message : 'Handling Post request to /product',
            createdProduct : {product}
        });
    });
    router.get('/:productId',(req,res,next)=> {
        const id=req.params.productId;
        Product.findById(id)
        .select( 'name price _id productImage').exec()
        .then(doc => { 
            console.log("From database", doc);
            if(doc){
                res.status(200).json({
                    product : doc,
                    request : {
                        type : 'GET',
                        description : 'GET all products',
                        url : 'http://localhost:3000/products'
                    }
                });
            }else{
                res.status(404).json({message : 'No Valid entry found for provided ID'})
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
        // for(const ops in req.body){
            // updateOps[ops.propName] = ops.value;
        // }
        updateOps[req.body.propName] = req.body.value;
        console.log("updateOps",updateOps);
        Product.update({ _id : id},{$set: updateOps })    
        .exec()
        .then(result =>{
            res.status(200).json({
                message : "Product Updated",
                request: {
                    type : 'GET',
                    url : 'http://localhost:3000/products/'+ id
                }
            }); 
        }).catch(err=> {
            res.status(500).json({
                err : err
            });
        });
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