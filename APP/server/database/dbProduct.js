const db = require('./db.js'); // Assuming this returns a pool or client instance

// Get all products
async function getProducts() {
const client = await db.createDb();

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
    const client = await db.createDb();

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

// Get a ring product details by ID
async function getProductDetailsRing(id) {
    const client = await db.createDb();

    try {
        const [results] = await client.query(`
            SELECT Product.name,
                   Product.mass,
                   Product.price,
                   Product.type,
                   Ring.name  AS ringName,
                   Ring.size  AS ringName,
                   Ring.volume,
                   Metal.name AS metalName
            FROM Product
                     JOIN Ring ON Product.ringId = Ring.ringId
                     JOIN Metal ON Product.metalId = Metal.metalId
            WHERE Product.productId = ${id}`);
        return results[0]; // Return the first product found
    } catch (error) {
        console.error('Error fetching product by ID:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}


async function getProductDetailNecklace(id) {
    const client = await db.createDb();

    try {
        const [results] = await client.query(`
            SELECT Product.name,
                   Product.mass,
                   Product.price,
                   Product.type,
                   necklace.name        AS necklaceName,
                   necklace.size        AS necklaceSize,
                   necklace.totalVolume AS necklaceVolume,
                   Link.name            AS linkName,
                   link.size            AS linkSize,
                   g.name               AS gemName,
                   g.quality            AS gemQuality,
                   g.carat              AS gemCarat,
                   g.shape              AS gemShape
            FROM Product
                     JOIN Necklace ON Product.necklaceId = Necklace.necklaceId
                     JOIN Link ON Necklace.linkId = Link.linkId
                     JOIN Metal ON Product.metalId = Metal.metalId
                     LEFT JOIN family_jewels.gem g ON Product.gemId = g.gemId
            WHERE Product.productId = ?
        `, [id]); // Use parameterized query to prevent SQL injection

        return results[0]; // Return the first product found
    } catch (error) {
        console.error('Error fetching product by ID:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}



// Get a ring product details by ID
async function getProductDetailsNecklace(id) {
    const client = await db.createDb();

    try {
        const [results] = await client.query(`SELECT Product.name, Product.mass, Product.price, Product.type, Ring.name, Ring.size, Ring.volume 
                                                FROM Product
                                                JOIN Ring ON Product.ringId=Ring.ringId
                                                WHERE Product.productId = ${id}`);
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
    const client = await db.createDb();

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
    const client = await db.createDb();

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
    const client = await db.createDb();

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

module.exports = {getProducts, getProduct, addProduct, updateProduct, deleteProduct, getProductDetailsRing, getProductDetailNecklace};
