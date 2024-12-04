const db = require('./db.js'); // Assuming this returns a pool or client instance

// Get all products
async function getProducts() {
    const client = db.createDb(); // Create a connection or pool instance

    try {
        const [results] = await client.query('SELECT * FROM family_jewels.product');
        return results;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

// Get a product by ID
async function getProduct(id) {
    const client = db.createDb();

    try {
        const [results] = await client.query('SELECT * FROM family_jewels.product WHERE productId = ?', [id]);
        return results[0]; // Return the first product found
    } catch (error) {
        console.error('Error fetching product by ID:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

// Add a new product
async function addProduct(product) {
    const client = db.createDb();

    try {
        await client.query(
            `INSERT INTO family_jewels.product
                 (name, mass, price, metalId, gemId, necklaceId, ringId, creatorId)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [product.name, product.mass, product.price, product.metalId, product.gemId, product.necklaceId, product.ringId, product.creatorId]
        ); //creatorID is the fucking userID
        console.log('Product added successfully.');
    } catch (error) {
        console.error('Error adding product:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

// Update a product
async function updateProduct(product) {
    const client = db.createDb();

    try {
        await client.query(
            `UPDATE family_jewels.product
             SET name       = ?,
                 mass       = ?,
                 price      = ?,
                 metalId    = ?,
                 gemId      = ?,
                 necklaceId = ?,
                 ringId     = ?,
                 creatorId  = ?
             WHERE productId = ?`,
            [product.name,
            product.mass,
            product.price,
            product.metalId,
            product.gemId,
            product.necklaceId,
            product.ringId,
            product.creatorId,
            product.productId]
        );

        console.log('Product updated successfully.');
    } catch (error) {
        console.error('Error updating product:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

// Delete a product by ID
async function deleteProduct(id) {
    const client = db.createDb();

    try {
        await client.query('DELETE FROM family_jewels.product WHERE productId = ?', [id]);
        console.log('Product deleted successfully.');
    } catch (error) {
        console.error('Error deleting product:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

module.exports = {getProducts, getProduct, addProduct, updateProduct, deleteProduct};
