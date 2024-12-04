const db = require('./dbRing');

async function getRings() {
    const client = db.createDb();
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM family_jewels.ring');
        return res.rows;
    } catch (error) {
        console.error('Error getting rings:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

// Add a ring
async function addRing(ring) {
    const client = db.createDb();
    try {
        await client.connect();
        await client.query(
            `INSERT INTO family_jewels.ring
             (name, size, volume)
             VALUES (?, ?, ?)`,
            [ring.name, ring.size, ring.volume]
        );
        console.log('Ring added successfully.');
        return true;
    } catch (error) {
        console.error('Error adding ring:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

// Update a ring
async function updateRing(ring) {
    const client = db.createDb();
    try {
        await client.connect();
        await client.query(
            `UPDATE family_jewels.ring
             SET name   = ?,
                 size   = ?,
                 volume = ?
             WHERE ringId = ?`,
            [ring.name, ring.size, ring.volume, ring.ringId]
        );
        console.log('Ring updated successfully.');
        return true;
    } catch (error) {
        console.error('Error updating ring:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}


// Delete a ring
async function deleteRing(ringId) {
    const client = db.createDb();
    try {
        await client.connect();
        await client.query('DELETE FROM family_jewels.ring WHERE ringId = ?', [ringId]);
        console.log('Ring deleted successfully.');
    } catch (error) {
        console.error('Error deleting ring:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

module.exports = {
    getRings,
    addRing,
    updateRing,
    deleteRing
};