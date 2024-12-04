const dbNecklace = require('../database/dbNecklace');
const { verifyToken } = require('./tokenFunction');

exports.getAllNecklaces = async (req, res) => {
    try {
        const necklaces = await dbNecklace.getNecklaces();
        res.status(200).json(necklaces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.addNecklace = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = verifyToken(token);
        if(!user){
            return res.status(401).json({ message: 'Unauthorized' });
        }else if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const {name, linkAmount, size, totalVolume} = req.body;
        if (!linkId || !name || !linkAmount || !size || !totalVolume) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const necklace = {
            name,
            linkAmount,
            size,
            totalVolume
        };
        await dbNecklace.addNecklace(necklace);
        res.status(201).json({ message: 'Necklace added successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateNecklace = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = verifyToken(token);
        if(!user){
            return res.status(401).json({ message: 'Unauthorized' });
        }else if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const {linkId, name, linkAmount, size, totalVolume} = req.body;
        if (!linkId || !name || !linkAmount || !size || !totalVolume) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const necklace = {
            linkId,
            name,
            linkAmount,
            size,
            totalVolume
        };
        await dbNecklace.updateNecklace(necklace);
        res.status(200).json({ message: 'Necklace updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteNecklace = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = verifyToken(token);
        if(!user){
            return res.status(401).json({ message: 'Unauthorized' });
        }else if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const {necklaceId} = req.body;
        if (!necklaceId) {
            return res.status(400).json({ message: 'Necklace ID is required.' });
        }
        await dbNecklace.deleteNecklace(necklaceId);
        res.status(200).json({ message: 'Necklace deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
