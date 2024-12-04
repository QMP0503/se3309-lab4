const express = require('express');
const router = express.Router();

const db = require('../database/db.js');

const gemController = require('../database/dbGems.js');
const linkController = require('../database/dbLink.js');
const metalController = require('../database/dbMetal.js');
const necklaceController = require('../database/dbNecklace.js');
const orderController = require('../database/dbOrder.js');
const productController = require('../database/dbProduct.js');
const ringController = require('../database/dbRing.js');
const userController = require('../database/dbUser.js');


router.get('/products', (req, res) => {
    const query = 'SELECT * FROM family_jewels.user';
    db.query(query, (err, results) => {
        if(err){
            console.error = err.message;
            res.status(500).send('Error retrieving data from the database');
        }else{
            res.json(results);
        }
    })
    
})
//get all necklaces
router.get("/api/open/necklaces", async (req, res) => {
    try {
        const necklaces = await necklaceController.getNecklaces();
        res.status(200).json(necklaces);
    } catch (error) {
        res.status(500).json({ error: "Error fetching necklaces" });
    }
});

//get product by product id
router.get("/api/open/products/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        const product = await productController.getProduct(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching product" });
    }
});

//get all products
router.get("/api/open/products", async (req, res) => {
    try {
        const products = await productController.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
});

//get all rings 
router.get("/api/open/rings", async (req, res) => {
    try {
        const rings = await ringController.getRings();
        res.status(200).json(rings);
    } catch (error) {
        res.status(500).json({ error: "Error fetching rings" });
    }
});


//create a new user
router.post("/api/open/user", async (req, res) => {
    const customer = req.body; // Assuming the user data is in the body
    try {
        await userController.addUser(customer);
        res.status(201).json({ message: "User added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error adding user" });
    }
});

//get all metals
router.get("/api/open/metals", async (req, res) => {
    try {
        const metals = await metalController.getMetals();
        res.status(200).json(metals);
    } catch (error) {
        res.status(500).json({ error: "Error fetching metals" });
    }
});

//get all links
router.get("/api/open/links", async (req, res) => {
    try {
        const links = await linkController.getLink();
        res.status(200).json(links);
    } catch (error) {
        res.status(500).json({ error: "Error fetching links" });
    }
});

//get all gems
router.get("/api/open/gems", async (req, res) => {
    try {
        const gems = await gemController.getAllGems();
        res.status(200).json(gems);
    } catch (error) {
        res.status(500).json({ error: "Error fetching gems" });
    }
});

//get gems by id 
router.get("/api/open/gems/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const gem = await gemController.getGemById(id);
        if (gem.length === 0) {
            return res.status(404).json({ error: "Gem not found" });
        }
        res.status(200).json(gem[0]);
    } catch (error) {
        res.status(500).json({ error: "Error fetching gem" });
    }
});




module.exports = router;