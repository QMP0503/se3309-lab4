const dbRing = require('../database/dbRing');

exports.getAllRings = async (req, res) => {
    try {
        const rings = await dbRing.getRings();
        res.status(200).json(rings);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.addRing = async (req, res) => {
    try {
        const ring = req.body;
        const ringId = await dbRing.addRing(ring);
        res.status(201).json({message: 'Ring added successfully.', ringId : ringId});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.updateRing = async (req, res) => {
    try {
        const ring = req.body;
        await dbRing.updateRing(ring);
        res.status(200).json({message: 'Ring updated successfully.'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.deleteRing = async (req, res) => {
    try {
        const ringId = req.params.id;
        await dbRing.deleteRing(ringId);
        res.status(200).json({message: 'Ring deleted successfully.'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}