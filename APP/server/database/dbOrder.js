const db = require('./db.js');

async function getOrders() {
    const client = await db.createDb();
    try {
        await client.connect();

        const query = `
            SELECT
                co.*,
                c.address,
                c.emailAddress,
                c.phoneNumber,
                u.firstName,
                u.lastName
            FROM
                family_jewels.customer_order co
                    JOIN
                family_jewels.customer c
                ON
                    co.customerId = c.customerId
                    JOIN
                family_jewels.user u
                ON
                    c.customerId = u.userId
        `;

        const res = await client.query(query);
        return res[0]; // Return all rows as an array
    } catch (error) {
        console.error('Error getting orders:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

async function getUserOrders(id) {
    const client = await db.createDb();
    try {
        await client.connect();

        const query = `
            SELECT
                co.*,
                c.address,
                c.emailAddress,
                c.phoneNumber,
                u.firstName,
                u.lastName
            FROM
                family_jewels.customer_order co
                    JOIN
                family_jewels.customer c
                ON
                    co.customerId = c.customerId
                    JOIN
                family_jewels.user u
                ON
                    c.customerId = u.userId
            WHERE co.customerId = ${id}
        `;

        const res = await client.query(query);
        return res[0]; // Return all rows as an array
    } catch (error) {
        console.error('Error getting orders:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

//add order
async function addOrder(order) {
    const client = await db.createDb();
    try {
        await client.connect();
        await client.beginTransaction();

        //Insert order
        const orderRes = await client.query(
            `INSERT INTO family_jewels.customer_order
             (customerId, startDate, totalPrice, totalMass, status)
             VALUES (?, ?, ?, ?, ?)`,
            [order.customerId, order.startDate, order.totalPrice, order.totalMass, order.status]
        );

        const orderId = orderRes.insertId;

        for(const product of order.products){
            await client.query(
                `INSERT INTO family_jewels.product_order
                 (orderId, productId, quantity)
                 VALUES (?, ?, ?)`,
                [orderId, product.productId, product.quantity]
            );
        }

        await client.commit();
        console.log(`Order ID ${orderRes.insertId} added successfully.`);
    } catch (error) {
        console.error('Error adding order:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

//update order
async function updateOrder(order) {
    const client = await db.createDb();
    try {
        await client.connect();
        await client.beginTransaction();
        await client.query(
            `UPDATE family_jewels.customer_order
             SET customerId = ?, startDate = ?, totalPrice = ?, totalMass = ?, status = ?
             WHERE orderId = ?`,
            [order.customerId, order.startDate, order.totalPrice, order.totalMass, order.status, order.orderId]
        );

        for(const product of order.products){
            await client.query(
                `UPDATE family_jewels.product_order
                 SET productId = ?, quantity = ?
                 WHERE orderId = ?`,
                [product.productId, product.quantity, order.orderId]
            );
        }

        await client.commit();
        console.log('Order updated successfully.');
        return true;
    } catch (error) {
        console.error('Error updating order:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

//delete order
async function deleteOrder(orderId) {
    const client = await db.createDb();
    try {
        await client.connect();
        await client.query('DELETE FROM family_jewels.customer_order WHERE orderId = ?', [orderId]);
        console.log('Order deleted successfully.');
        return true;
    } catch (error) {
        console.error('Error deleting order:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

module.exports = {
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder,
    getUserOrders
}