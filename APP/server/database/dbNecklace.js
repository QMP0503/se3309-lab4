const db = require('./db');

async function getNecklaces() {
    const client = db.createDb();
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM family_jewels.necklace');
        return res.rows;
    } catch (error) {
        console.error('Error getting necklaces:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

async function addNecklace(necklace) {
    const client = db.createDb();
    try {
        await client.connect();
        await client.query(
            `INSERT INTO family_jewels.necklace
             (linkId, name, linkAmount, size, totalVolume)
             VALUES (?, ?, ?, ?, ?) `,
            [necklace.linkId, necklace.name, necklace.linkAmount, necklace.size, necklace.totalVolume]
        );
        console.log('Necklace added successfully.');
    } catch (error) {
        console.error('Error adding necklace:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

async function updateNecklace(necklace) {
    const client = db.createDb();
    try {
        await client.connect();
        await client.query(
            `UPDATE family_jewels.necklace
             SET linkId = ?, name = ?, linkAmount = ?, size = ?, totalVolume = ?
             WHERE necklaceId = ?`,
            [necklace.linkId, necklace.name, necklace.linkAmount, necklace.size, necklace.totalVolume, necklace.necklaceId]
        );
        console.log('Necklace updated successfully.');
    } catch (error) {
        console.error('Error updating necklace:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

async function deleteNecklace(necklaceId) {
    const client = db.createDb();
    try {
        await client.connect();
        await client.query(
            `DELETE FROM family_jewels.necklace
             WHERE necklaceId = ?`,
            [necklaceId]
        );
        console.log('Necklace deleted successfully.');
    } catch (error) {
        console.error('Error deleting necklace:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

module.exports = {
    getNecklaces,
    addNecklace,
    updateNecklace,
    deleteNecklace
};