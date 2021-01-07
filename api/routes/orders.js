
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');
const checkAuth = require('../middleware/checkAuth');
const orderController= require('../controllers/orders')

router.get('/',orderController.orders_getall);
router.post('/:postid',checkAuth,orderController.orders_postId);
router.get('/:orderId',checkAuth,orderController.orders_getId);
router.delete('/:orderid' ,orderController.order_delete);

module.exports = router;