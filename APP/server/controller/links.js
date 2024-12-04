const dbLinks = require('../database/dbLink');
const {verifyToken} = require("./tokenFunction");

exports.getLinks = async (req, res) => {
    try {
        const links =  await dbLinks.getLink();
        res.status(200).json(links);
    } catch (error) {
        console.log('Error getting links:', error);
        throw error;
    }
}

//need to be authenticated as admin to add, update and delete links

exports.addLink = async (req, res) => {
    try {
        const authorized = req.headers.authorization; //ALREADY SPLITTING INSIDE FUNCTION
        const checkUser = verifyToken(authorized); //returned user object

        if (!checkUser) {
            return res.status(401).json({ error: 'Unauthorized' });
        } else if (checkUser.type !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const { name, size, volume } = req.body;
        const link = {  name, size, volume };
        const newLink = await dbLinks.addLink(link);

        res.status(201).json({
            message: 'Link added successfully',
            link: newLink //print for confirmation
        });

    } catch (error) {
        console.error('Error adding link:', error);
        res.status(500).json({ error: 'Failed to add link' });
    }
}

exports.deleteLink = async (req, res) => {
    try {
        const authorized = req.headers.authorization
        const checkUser = verifyToken(authorized);

        if (!checkUser) {
            return res.status(401).json({error: 'Unauthorized'});
        } else if (checkUser.type !== 'admin') {
            return res.status(403).json({error: 'Forbidden'});
        }

        const {linkId} = req.params;
        const {name, size, volume} = req.body;
        if(!linkId || isNaN(linkId)) {
            return res.status(400).json({error: "Invalid link ID"});
        }else if(!name || !size || !volume) {
            return res.status(400).json({error: "Invalid link data"});
        }

    }catch (error) {
        console.error('Error deleting link:', error);
        res.status(500).json({error: 'Failed to delete link'});
    }
}

exports.updateLink = async (req, res) => {
    try {
        const authorized = req.headers.authorization;
        const checkUser = verifyToken(authorized);

        if (!checkUser) {
            return res.status(401).json({error: 'Unauthorized'});
        } else if (checkUser.type !== 'admin') {
            return res.status(403).json({error: 'Forbidden'});
        }

        const {linkId} = req.params;
        const {name, size, volume} = req.body;
        if(!linkId || isNaN(linkId)) {
            return res.status(400).json({error: "Invalid link ID"});
        }else if(!name || !size || !volume) {
            return res.status(400).json({error: "Invalid link data"});
        }

        const link = {linkId, name, size, volume};
        const updatedLink = await dbLinks.updateLink(link);

        res.status(200).json({
            message: 'Link updated successfully',
            link: updatedLink
        });

    } catch (error) {
        console.error('Error updating link:', error);
        res.status(500).json({error: 'Failed to update link'});
    }
}