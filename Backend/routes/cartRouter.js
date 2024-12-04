const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');  



router.post('/add-to-cart', cartController.addToCart); 


router.get('/cart', cartController.getCart);  


router.delete('/remove', cartController.removeItem);  

router.delete('/clear/:userId', cartController.clearCart);  

module.exports = router;
