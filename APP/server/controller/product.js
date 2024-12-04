const dbProduct = require('../database/dbProduct');
const { verifyToken } = require('./tokenFunction');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await dbProduct.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add a product with things that are inside the front end
exports.addProduct = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = verifyToken(token);
        console.log(user)
        if(!user){
            return res.status(401).json({ message: 'Unauthorized' });
        }else if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        //CREATOR ID IS THE USER ID
        const {name, mass, price, metalId, gemId, necklaceId, ringId, creatorId} = req.body;
        console.log(name, mass, price, metalId, gemId, necklaceId, ringId, creatorId)
        if (!name || !mass || !price || !metalId || (!necklaceId && !ringId) || !creatorId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const product = {
            name,
            mass,
            price,
            metalId,
            gemId,
            necklaceId,
            ringId,
            creatorId
        };
        await dbProduct.addProduct(product);
        res.status(201).json({ message: 'Product added successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = verifyToken(token);
        if(!user){
            return res.status(401).json({ message: 'Unauthorized' });
        }else if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const {productId, name, mass, price, metalId, gemId, necklaceId, ringId, creatorId} = req.body;
        if (!productId || !name || !mass || !price || !metalId || !gemId || (!necklaceId || !ringId) || !creatorId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const product = {
            productId,
            name,
            mass,
            price,
            metalId,
            gemId,
            necklaceId,
            ringId,
            creatorId
        };
        await dbProduct.updateProduct(product);
        res.status(200).json({ message: 'Product updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = verifyToken(token);
        if (!user) {
            return res.status(401).json({message: 'Unauthorized'});
        } else if (user.role !== 'admin') {
            return res.status(403).json({message: 'Forbidden'});
        }
        const {productId} = req.body;
        if (!productId) {
            return res.status(400).json({message: 'Product ID is required.'});
        }
        await dbProduct.deleteProduct(productId);
        res.status(200).json({message: 'Product deleted successfully.'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

exports.getRingDetails = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = verifyToken(token);
        // if(!user){
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }else if (user.role !== 'admin') {
        //     return res.status(403).json({ message: 'Forbidden' });
        // }
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required.' });
        }
        const details = await dbProduct.getProductDetailsRing(productId);
        res.status(200).json({ message: details });
    } catch (error) {
        // If an error occurs, send a 500 response with the error message
        console.error('Error fetching ring details:', error.message);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

exports.getNecklaceDetails = async (req, res) => {
    try {
        const { productId } = req.params.id;

        // Check if productId is provided in the request parameters
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required.' });
        }

        // Fetch product details from the database using the provided productId
        const productDetail = await dbProduct.getProductDetailNecklace(productId);

        // If no product details found, return a 404 error
        if (!productDetail) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        // Return product details in the response
        res.status(200).json({
            message: 'Success.',
            ProductDetail: productDetail
        });

    } catch (error) {
        // If an error occurs, return a 500 response with the error message
        console.error('Error fetching necklace details:', error.message);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};
