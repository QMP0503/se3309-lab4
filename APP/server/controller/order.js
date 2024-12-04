const dbOrders = require('../database/dbOrder');

//just get all of them because everything else can be done in the frontend
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await dbOrders.getOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//anyone can add order because they literally make the order
//might have the calculations in the frontend....
//(not the smartest idea... but it would make it easier with given data)
exports.addOrder = async (req, res) => {
    try {
        const {customerId, startDate, totalPrice, totalMass, status, products} = req.body;
        if (!customerId || !startDate || !totalPrice || !totalMass || !status || !products) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const order = {
            customerId,
            startDate,
            totalPrice,
            totalMass,
            status,
            products
        };
        await dbOrders.addOrder(order);
        res.status(201).json({ message: 'Order added successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//only admin can update order because they can change the status
//sending products as an entire object (product : {productId, quantity})
exports.updateOrder = async (req, res) => {
    try {
        const {orderId, customerId, startDate, totalPrice, totalMass, status, products} = req.body;
        if (!orderId || !customerId || !startDate || !totalPrice || !totalMass || !status || !products) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const order = {
            orderId,
            customerId,
            startDate,
            totalPrice,
            totalMass,
            status,
            products
        };
        await dbOrders.updateOrder(order);
        res.status(200).json({ message: 'Order updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//might restrict to only admin
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        if (!orderId) {
            return res.status(400).json({ message: 'Order ID is required.' });
        }
        await dbOrders.deleteOrder(orderId);
        res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}