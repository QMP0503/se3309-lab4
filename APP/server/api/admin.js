const express = require('express');
const router = express.Router();

const gemController = require('../database/dbGems.js');
const linkController = require('../database/dbLink.js');
const metalController = require('../database/dbMetal.js');
const necklaceController = require('../database/dbNecklace.js');
const orderController = require('../database/.dbOrderjs');
const productController = require('../database/dbProduct.js');
const ringController = require('../database/dbRing.js');
const userController = require('../database/dbUser.js');

router.delete("/api/admin/orders/:id", async (req, res) => {
    
    const { id } = req.params;

    try {
        await orderController.deleteOrder(id);
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting order" });
    }
});


router.get("/api/admin/orders", async (req, res) => {
    try {
        const orders = await orderController.getOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Error fetching orders" });
    }
});

router.put("/api/admin/user/:id", async (req, res) => {
    const userId = req.params.id;
    const user = { ...req.body, userid: userId }; // Include the ID in the request body
    try {
        await userController.updateUser(user);
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
    }
});


router.delete("/api/admin/user/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        await userController.deleteUser(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
});

router.delete("/api/admin/rings/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await ringController.deleteRing(id);
        res.status(200).json({ message: "Ring deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting ring" });
    }
});

router.delete("/api/admin/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await productController.deleteProduct(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting product" });
    }
});

router.delete("/api/admin/necklaces/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await necklaceController.deleteNecklace(id);
        res.status(200).json({ message: "Necklace deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting necklace" });
    }
});

router.post("/api/admin/metals", async (req, res) => {
    const { name, purity, type, costPerGram, density } = req.body;
    const newMetal = { name, purity, type, costPerGram, density };

    try {
        await metalController.addMetal(newMetal);
        res.status(201).json({ message: "Metal added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error adding metal" });
    }
});

router.put("/api/admin/metals/:id", async (req, res) => {
    const { id } = req.params;
    const { name, purity, type, costPerGram, density } = req.body;

    const updatedMetal = {
        metalId: id,
        name,
        purity,
        type,
        costPerGram,
        density
    };

    try {
        await metalController.updateMetal(updatedMetal);
        res.status(200).json({ message: "Metal updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating metal" });
    }
});

router.delete("/api/admin/metals/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await metalController.deleteMetal(id);
        res.status(200).json({ message: "Metal deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting metal" });
    }
});

router.post("/api/admin/links", async (req, res) => {
    const { name, size, volume } = req.body;
    const newLink = { name, size, volume };

    try {
        await linkController.addLink(newLink);
        res.status(201).json({ message: "Link added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error adding link" });
    }
});

router.put("/api/admin/links/:id", async (req, res) => {
    const { id } = req.params;
    const { name, size, volume } = req.body;

    const updatedLink = {
        linkId: id,
        name,
        size,
        volume
    };

    try {
        await linkController.updateLink(updatedLink);
        res.status(200).json({ message: "Link updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating link" });
    }
});

router.delete("/api/admin/links/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await linkController.deleteLink(id);
        res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting link" });
    }
});

router.post("/api/admin/gems", async (req, res) => {
    const { name, quality, carat, shape, stock, price } = req.body;
    const newGem = { name, quality, carat, shape, stock, price };

    try {
        await gemController.addGem(newGem);
        res.status(201).json({ message: "Gem added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error adding gem" });
    }
});

router.put("/api/admin/gems/:id", async (req, res) => {
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
        await gemController.updateGem(updatedGem);
        res.status(200).json({ message: "Gem updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating gem" });
    }
});

router.delete("/api/admin/gems/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await gemController.deleteGem(id);
        res.status(200).json({ message: "Gem deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting gem" });
    }
});

router.post("/api/admin/rings", async (req, res) => {
    const { name, size, volume } = req.body;
    const newRing = { name, size, volume };

    try {
        await ringController.addRing(newRing);
        res.status(201).json({ message: "Ring added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error adding ring" });
    }
});

router.put("/api/admin/rings/:id", async (req, res) => {
    const { id } = req.params;
    const { name, size, volume } = req.body;

    const updatedRing = { ringId: id, name, size, volume };

    try {
        await ringController.updateRing(updatedRing);
        res.status(200).json({ message: "Ring updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating ring" });
    }
});
router.post("/api/admin/necklaces", async (req, res) => {
    const { linkId, name, linkAmount, size, totalVolume } = req.body;
    const newNecklace = { linkId, name, linkAmount, size, totalVolume };

    try {
        await necklaceController.addNecklace(newNecklace);
        res.status(201).json({ message: "Necklace added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error adding necklace" });
    }
});

router.put("/api/admin/necklaces/:id", async (req, res) => {
    const { id } = req.params;
    const { linkId, name, linkAmount, size, totalVolume } = req.body;

    const updatedNecklace = {
        necklaceId: id,
        linkId,
        name,
        linkAmount,
        size,
        totalVolume
    };

    try {
        await necklaceController.updateNecklace(updatedNecklace);
        res.status(200).json({ message: "Necklace updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating necklace" });
    }
});
module.exports = router;