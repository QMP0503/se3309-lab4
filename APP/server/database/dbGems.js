const db = require('./db.js'); // Assuming db.createDb() creates a connection or pool

// Get all gems
async function getAllGems() {
    const client = await db.createDb(); // Create a connection or pool instance
    
    try {
        console.log('client:', client);
        const results = await client.query('SELECT * FROM family_jewels.gem');
        return results[0];
    } catch (error) {
        console.error('Error fetching all gems:', error.message);
        throw error; // Re-throw for calling function to handle
    } finally {
        await client.end(); // Close the connection
    }
}

// Get a gem by its ID
async function getGemById(gem_id) {
    const client = await db.createDb();

    try {
        const results = await client.query('SELECT * FROM family_jewels.gem WHERE gemId = ?', [gem_id]);
        return results[0]; // Return the first result (or undefined if not found)
    } catch (error) {
        console.error('Error fetching gem by ID:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

// Export the functions for use in the API
async function addGem(gem) {
    const client = db.createDb();
    try {
        await client.query(
            `INSERT INTO family_jewels.gem
                 (name, quality, carat, shape, stock , price)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [gem.name, gem.quality, gem.carat, gem.shape, gem.stock, gem.price]
        );
        console.log('Gem added successfully.');
    } catch (error) {
        console.error('Error adding gem:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

async function updateGem(gem) {
    const client = db.createDb();

    try {
        await client.query(
            `UPDATE family_jewels.gem
             SET name       = ?,
                 quality    = ?,
                 carat      = ?,
                 shape      = ?,
                 stock      = ?,
                 price      = ?
             WHERE gemId = ?`,
            [gem.name, gem.quality, gem.carat, gem.shape, gem.stock, gem.price]
        );
        console.log('Gem updated successfully.');
    } catch (error) {
        console.error('Error updating gem:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

async function deleteGem(gem_id) {
    const client = db.createDb();

    try {
        await client.query('DELETE FROM family_jewels.gem WHERE gemId = ?', [gem_id]);
        console.log('Gem deleted successfully.');
    } catch (error) {
        console.error('Error deleting gem:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

module.exports = {
    getAllGems,
    getGemById,
    addGem,
    updateGem,
    deleteGem
};
