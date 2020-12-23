
const express = require('express');
const router = express.Router();


router.get('/',(req,res,next) => {
    res.status(200).json({
        message: 'handle get order request /order/home'
    })
});
router.post('/',(req,res,next) => {
    const order = {
        productid : req.body.productid ,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message : 'Order was created' ,
        order : order
    })
});

router.post('/:postid',(req,res,next) => {
    const id = req.params.postid;
    if(id === 'postid'){
        res.status(200).json({
            message : 'postid is requested'
        })
    }
});
router.delete('/:orderid',(req,res,next) => {
        res.status(200).json({
            message : 'postid is requested',
            orderid : 'req.params.orderid'
        })
    
});

module.exports = router;