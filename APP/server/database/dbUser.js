const db = require('./db'); // Assuming db.createDb() returns a connection or pool

//only used for login
async function userLogin(username) {
const client = await db.createDb();
    client.connect();
    return client.query(`SELECT * FROM user WHERE username = (?)`, [username])
        .then(res => {
            client.end();
            return res[0];
        })
        .catch(err => {
            client.end();
            return err;
        });
}

// Get all users
async function getUsers() {
const client = await db.createDb();
    try {
        const results = await client.query('SELECT * FROM user');
        return results[0];
    } catch (error) {
        console.error('Error fetching users:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}


// Add a new user (Admin or Customer)
async function addUser(user) {
const client = await db.createDb();

    try {
        await client.connect();
        // Insert user into the `user` table
        const userQuery = `
            INSERT INTO user (userType, username, firstName, lastName, password) 
            VALUES (?, ?, ?, ?, ?)`;
        await client.query(userQuery, [user.userType, user.username , user.firstName, user.lastName, user.username]);

        // Retrieve the user after insertion
        const [userResult] = await client.query('SELECT * FROM user WHERE username = ?', [user.username]);
        const newUser = userResult[0];

        // If userType is 'Customer', insert additional customer details
        if (user.userType === 'Customer') {
            const customerQuery = `
                INSERT INTO customer (customerId, address, emailAddress, phoneNumber) 
                VALUES (?, ?, ?, ?)`;
            await client.query(customerQuery, [newUser.userId, user.address, user.emailAddress, user.phoneNumber]);
        }

        console.log('User added successfully');
        return true;

    } catch (error) {
        console.error('Error adding user:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

// Update an existing user
async function updateUser(user) {
const client = await db.createDb();

    try {
        // Update the `user` table
        const userUpdateQuery = `
            UPDATE user 
            SET userType = ?, username = ?, firstName = ?, lastName = ?, password = ? 
            WHERE userid = ?`;
        await client.query(userUpdateQuery, [user.userType, user.username, user.firstName, user.lastName, user.password, user.userId]);

        // If userType is 'Customer', update additional customer details
        if (user.userType === 'Customer') {
            const customerUpdateQuery = `
                UPDATE customer 
                SET address = ?, emailAddress = ?, phoneNumber = ? 
                WHERE customerId = ?`;
            await client.query(customerUpdateQuery, [user.address, user.emailAddress, user.phoneNumber, user.userid]);
        }

        console.log('User updated successfully');
        return true;

    } catch (error) {
        console.error('Error updating user:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

// Delete a user by ID (only from `user` table, not `customer`)
async function deleteUser(id) {
const client = await db.createDb();

    try {
        await client.query('DELETE FROM user WHERE userid = ?', [id]);
        console.log('User deleted successfully');
        return true;

    } catch (error) {
        console.error('Error deleting user:', error.message);
        throw error;
    } finally {
        await client.end();
    }
}

module.exports = {
    userLogin,
    getUsers,
    addUser,
    updateUser,
    deleteUser
};
