const dbMetal = require('../database/dbMetal');
const {verifyToken} = require("./tokenFunction");

exports.getMetal = async (req, res) => {
    console.log("asdasd")
    try {
        const metal =  await dbMetal.getMetals();
        res.status(200).json(metal);
    } catch (error) {
        console.log('Error getting metal:', error);
        throw error;
    }
}

exports.getMetalDistinct = async (req, res) => {
    console.log("asdasd")
    try {
        const metal =  await dbMetal.getMetals();
        res.status(200).json(metal);
    } catch (error) {
        console.log('Error getting metal:', error);
        throw error;
    }
}

exports.addMetal = async (req, res) => {
    try {
        const authorized = req.headers.authorization
        const checkUser = verifyToken(authorized);
        if (!checkUser) {
            return res.status(401).json({error: 'Unauthorized'});
        } else if (checkUser.type !== 'admin') {
            return res.status(403).json({error: 'Forbidden'});
        }
        const {name, purity, type, costPerGram, density} = req.body;
        const newMetal = {name, purity, type, costPerGram, density};
        const result = await dbMetal.addMetal(newMetal);
        res.status(201).json({message: "Metal added successfully", status: result});
    } catch (error) {
        console.log('Error adding metal:', error);
        throw error;
    }
}

exports.updateMetal = async (req, res) => {
    try {
        const authorized = req.headers.authorization
        const checkUser = verifyToken(authorized);
        if (!checkUser) {
            return res.status(401).json({error: 'Unauthorized'});
        } else if (checkUser.type !== 'admin') {
            return res.status(403).json({error: 'Forbidden'});
        }
        const {metalId} = req.params;
        const {name, purity, type, costPerGram, density} = req.body;
        const updatedMetal = {metalId, name, purity, type, costPerGram, density};
        const result = await dbMetal.updateMetal(updatedMetal);
        res.status(200).json({message: "Metal updated successfully", status: result});
    } catch (error) {
        console.log('Error updating metal:', error);
        throw error;
    }
}

exports.deleteMetal = async (req, res) => {
    try {
        const authorized = req.headers.authorization
        const checkUser = verifyToken(authorized);
        if (!checkUser) {
            return res.status(401).json({error: 'Unauthorized'});
        } else if (checkUser.type !== 'admin') {
            return res.status(403).json({error: 'Forbidden'});
        }
        const {metalId} = req.params;
        const result = await dbMetal.deleteMetal(metalId);
        res.status(200).json({message: "Metal deleted successfully", status: result});
    } catch (error) {
        console.log('Error deleting metal:', error);
        throw error;
    }
}