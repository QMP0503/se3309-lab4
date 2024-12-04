const db = require('./db.js');

//get all link
async function getLink() {
    const client = await db.createDb();
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM family_jewels.link');
        return res[0];
    } catch (error) {
        console.error('Error getting link:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

//add link
async function addLink(link) {
    const client = await db.createDb();
    try {
        await client.connect();
        await client.query(
            `INSERT INTO family_jewels.link
             (name, size, volume)
             VALUES (?, ? ,?) `,
            [link.name, link.size, link.volume]
        );
        console.log('Link added successfully.');
    } catch (error) {
        console.error('Error adding link:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

//update link
async function updateLink(link) {
    const client = await db.createDb();
    try {
        await client.connect();
        await client.query(
            `UPDATE family_jewels.link
             SET name = ?, size = ?, volume = ?
             WHERE linkId = ?`,
            [link.name, link.size, link.volume, link.linkId]
        );
        console.log('Link updated successfully.');
    } catch (error) {
        console.error('Error updating link:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

//delete link
async function deleteLink(linkId) {
    const client = await db.createDb();
    try {
        await client.connect();
        await client.query('DELETE FROM family_jewels.link WHERE linkId = ?', [linkId]);
        console.log('Link deleted successfully.');
    } catch (error) {
        console.error('Error deleting link:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

module.exports = {
    getLink,
    addLink,
    updateLink,
    deleteLink
};