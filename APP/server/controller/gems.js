const dbGems = require('../database/dbGems');

exports.getGems = async (req, res) => {
    try {
        const gems =  await dbGems.getAllGems();
        res.status(200).json(gems);
    } catch (error) {
        console.log('Error getting gems:', error);
        throw error;
    }
}

exports.getGemsById = async (req, res) => {
    const { id } = req.params;
    try {
        const gem = await dbGems.getGemById(id);
        res.status(200).json(gem);
    } catch (error) {
        console.log('Error getting gem:', error);
        throw error;
    }
}

exports.addGem = async (req, res) => {
    const { name, quality, carat, shape, stock, price } = req.body;
    const newGem = { name, quality, carat, shape, stock, price };

    try {
        await dbGems.addGem(newGem);
        res.status(201).json({ message: "Gem added successfully" });
    } catch (error) {
        console.log('Error adding gem:', error);
        throw error;
    }
}

exports.updateGem = async (req, res) => {
    const { id } = req.params;
    const { name, quality, carat, shape, stock, price } = req.body;

    const updatedGem = {
        gemId: id,
        name,
        quality,
        carat,
        shape,
        stock,
        price
    };

    try {
        await dbGems.updateGem(updatedGem);
        res.status(200).json({ message: "Gem updated successfully" });
    } catch (error) {
        console.log('Error updating gem:', error);
        throw error;
    }
}

exports.deleteGem = async (req, res) => {
    const { id } = req.params;

    try {
        await dbGems.deleteGem(id);
        res.status(200).json({ message: "Gem deleted successfully" });
    } catch (error) {
        console.log('Error deleting gem:', error);
        throw error;
    }
}

