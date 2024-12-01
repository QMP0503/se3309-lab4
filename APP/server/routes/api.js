//route all functions to the controller
const express = require('express');
const router = express.Router();

// TODO: import controllers
const gemsController = require('../controller/gems');
const ringController = require('../controller/ring');
const userController = require('../controller/user');
const linksController = require('../controller/links');
const orderController = require('../controller/order');
const productController = require('../controller/product');
const metalController = require('../controller/metal');
const necklaceController = require('../controller/necklace');

// TODO: route functions

//gems
router.get('/gems', gemsController.getGems);
router.post('/gems', gemsController.addGem);
router.put('/gems', gemsController.updateGem);
router.delete('/gems/:id', gemsController.deleteGem);

//ring
router.get('/rings', ringController.getAllRings);
router.post('/rings', ringController.addRing);
router.put('/rings', ringController.updateRing);
router.delete('/rings/:id', ringController.deleteRing);

//user
router.get('/users', userController.getUserList);
router.post('/register', userController.register);
router.post('/login', userController.login); //login must be post
router.put('/users', userController.updateUser);
//did not add delete user yet...

//links
router.get('/links', linksController.getLinks);
router.post('/links', linksController.addLink);
router.put('/links', linksController.updateLink);
router.delete('/links/:id', linksController.deleteLink);

//order
router.get('/orders', orderController.getAllOrders);
//might need a get order by userID... not sure yet
router.post('/orders', orderController.addOrder);
router.put('/orders', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);
router.get('/orders/:id', orderController.getAllUserOrders)

//product
router.get('/products', productController.getAllProducts);
router.post('/products', productController.addProduct);
router.put('/products', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);
router.get('/products/details/ring/:id', productController.getRingDetails)
router.get('/products/details/necklace/:id', productController.getNecklaceDetails)

//metal
router.get('/metals', metalController.getMetal);
router.post('/metals', metalController.addMetal);
router.put('/metals', metalController.updateMetal);
router.delete('/metals/:id', metalController.deleteMetal);

//necklace
router.get('/necklaces', necklaceController.getAllNecklaces);
router.post('/necklaces', necklaceController.addNecklace);
router.put('/necklaces', necklaceController.updateNecklace);
router.delete('/necklaces/:id', necklaceController.deleteNecklace);

module.exports = router;