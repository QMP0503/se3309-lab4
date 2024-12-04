const db = require('./db.js');

//get all metal
async function getMetals(){
    const client = await db.createDb();
    try {
        await client.connect();
        const res = await client.query('SELECT * FROM family_jewels.metal');
        return res[0];
    } catch (error) {
        console.error('Error getting metal:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

//add metal
async function addMetal(metal){
    const client = await db.createDb();
    try {
        await client.connect();
        await client.query(            `INSERT INTO family_jewels.metal
             (name, purity, type, costPerGram, density)
             VALUES (?,?,?,?,?) `,
            [metal.name, metal.purity, metal.type, metal.costPerGram, metal.density]
        );
        console.log('Metal added successfully.');
        return true;
    } catch (error) {
        console.error('Error adding metal:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

//update metal
async function updateMetal(metal){
    const client = await db.createDb();
    try {
        await client.connect();
        await client.query(
            `UPDATE family_jewels.metal
             SET name = ?, purity = ?, type = ?, costPerGram = ?, density = ?
             WHERE metalId = ?`,
            [metal.name, metal.purity, metal.type, metal.costPerGram, metal.density, metal.metalId]
        );
        console.log('Metal updated successfully.');
        return true;
    } catch (error) {
        console.error('Error updating metal:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

//delete metal
async function deleteMetal(metalId){
    const client = await db.createDb();
    try {
        await client.connect();
        await client.query('DELETE FROM family_jewels.metal WHERE metalId = ?', [metalId]);
        console.log('Metal deleted successfully.');
        return true;
    } catch (error) {
        console.error('Error deleting metal:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

module.exports = {
    getMetals,
    addMetal,
    updateMetal,
    deleteMetal
};