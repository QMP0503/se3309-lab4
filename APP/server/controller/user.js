const dbUser = require('../database/dbUser');
const {generateToken, verifyToken} = require('./tokenFunction');


exports.login = async (req, res) => {
    try{
        //logging in with username because user does not have email
        const { username, password } = req.body;
        const result = await dbUser.userLogin(username);//MySQL returns an array of objects instead of just an object
        const user = result[0];// mysql data stuff

        if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }

        //compare password (no hash cause no time)
        if(!(password === user.password)){
            return res.status(401).json({ error: 'Invalid password' });
        }

        console.log(user);

        const token = generateToken(user);


        res.status(200).json({ //this is what will be stored in the front end
            message: 'Login successful',
            user: {
                user_id: user.userId,
                username: user.username,
                firstName: user.type,
                lastName: user.lastName,
                userType: user.firstName
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

        if(!username || !firstName || !lastName || !password || !emailAddress || !phoneNumber){
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const user = {userType: "customer" , username, firstName, emailAddress, phoneNumber, lastName, password};

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

        const user = { userId , username, firstName, lastName, emailAddress, phoneNumber,  password };

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
