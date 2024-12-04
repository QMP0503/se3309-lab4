const dbUser = require('../database/dbUser');
const {generateToken, verifyToken} = require('./tokenFunction');

const bcrypt = require('bcrypt');

/**
 * Hashes a password using bcrypt.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
async function hashPassword(password) {
    try {
        const saltRounds = 10; // The cost factor for bcrypt (higher is more secure but slower).
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

/**
 * Verifies a password against a hash.
 * @param {string} password - The plain text password.
 * @param {string} hash - The stored hashed password.
 * @returns {Promise<boolean>} - True if the password matches the hash.
 */
async function verifyPassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
}

/*
when user login:
hash login
then compare with hashed password in db
if match, then login successful

LOGGING IN WOULD ONLY USE POST REQUEST

*/
exports.login = async (req, res) => {
    try{
        //logging in with username because user does not have email
        const { username, password } = req.body;
        const user = await dbUser.userLogin(username);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await verifyPassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        if(user.status === 'deactivated'){
            return res.status(402).json({error: 'Deactivated account status'})
        }
        const token = generateToken(user);

        res.status(200).json({ //this is what will be stored in the front end
            message: 'Login successful',
            user: {
                user_id: user.id,
                username: user.username,
                email: user.email,
                type: user.type,
                status: user.status,
                created_at: user.created_at,
                updated_at: user.updated_at
            },
            token: token
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'An unexpected error occurred while logging in' });
    }
}

/*3 status
* activated
* suspended
* pending
* */

//assuming that only user that would register are customers
exports.register = async (req, res) => {
    try {
        const { username, firstName, lastName, password, emailAddress, phoneNumber } = req.body;
        const hashedPassword = await hashPassword(password);

        const user = {userType: "customer" , username, firstName, emailAddress, phoneNumber, lastName, password: hashedPassword};

        const newUser = await dbUser.addUser(user);

        if (!newUser) {
            return res.status(500).json({ error: 'Failed to add user to database' });
        }

        res.status(201).json({
            message: 'User added successfully',
            user: newUser
        });

    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'An unexpected error occurred while adding the user' });
    }
};

//only for admin accounts
//need authentication
//might not have time to implement
exports.getUserList = async (req, res) => {
    try {
        const authorized = req.headers.authorization; //ALREADY SPLITTING INSIDE FUNCTION
        const checkUser = verifyToken(authorized); //returned user object

        if (!checkUser) {
            return res.status(401).json({ error: 'Unauthorized' });
        } else if (checkUser.type !== 'admin') {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const user = await dbUser.getUsers(); //get all users

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            user
        });

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
}

//only if user is logged into the correct account
exports.updateUser = async (req, res) => {
    try {
        const authorized = req.headers.authorization; //ALREADY SPLITTING INSIDE FUNCTION
        const checkUser = verifyToken(authorized); //returned user object

        if (!checkUser) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { userId , username, firstName, lastName, password, emailAddress, phoneNumber } = req.body;
        const hashedPassword = await hashPassword(password);

        const user = { userId , username, firstName, lastName, emailAddress, phoneNumber, password: hashedPassword };

        const updatedUser = await dbUser.updateUser(user);

        if (!updatedUser) {
            return res.status(500).json({ error: 'Failed to update user' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'An unexpected error occurred while updating the user' });
    }
}