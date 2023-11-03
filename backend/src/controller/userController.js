const { response } = require("express");
const UserSchema = require("../models/UserSchema");

const createUser = async (req, res) => {
    try {
        const newUser = new UserSchema(req.body);
        await newUser.save();
        res.status(201).json({
            message: "New User Created Successfully",
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message // Include the error message for debugging
        });
    }
};


const updateUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        const filter = { userId: userId };
        const update = req.body;

        const userExists = await UserSchema.exists(filter);
        if (userExists) {
            await UserSchema.updateOne(filter, update);
            res.status(200).json({
                message: "Updated User successfully",
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        const filter = { userId: userId };

        const userExists = await UserSchema.exists(filter);
        if (userExists) {
            await UserSchema.deleteOne(filter);
            res.status(200).json({
                message: "Deletion Successful",
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await UserSchema.find(); 

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.status(200).json(users);
    } catch (error) {
        
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    
     const user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

  
    res.status(200).json({ success: true, message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    loginUser
};
