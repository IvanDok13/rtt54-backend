const User = require('../models/User');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '24h'; // Token will be valid for 2 hours

async function getAllUsers(req, res) {
  console.log(req.user);

  if (!req.user) {
    return res
      .status(401)
      .json({ message: 'You must be logged in to see this!' });
  }

  const users = await User.find({});
  res.json(users);
}

function getUserById(req, res) {
  res.send(`Data for user: ${req.params.id}`);
}

/**
 * Register New User
 */
async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // check if user exists
    const dbUser = await User.findOne({ email });

    if (dbUser) {
      return res.status(400).json({ message: 'User already exist.' });
    }

    // Create new user
    const user = await User.create(req.body);
    console.log(user);

    const token = jwt.sign(
      { data: { _id: user._id, email: user.email } },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
}

/**
 *
 * Login User
 */
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user doesn't exist
    const dbUser = await User.findOne({ email: email });

    if (!dbUser) {
      return res.status(400).json({ message: 'Incorrect email or password.' });
    }

    const passwordMatched = await dbUser.isCorrectPassword(password);

    if (!passwordMatched) {
      return res.status(400).json({ message: 'Incorrect email or password.' });
    }

    // Create Payload
    const payload = {
      _id: dbUser._id,
      username: dbUser.username,
      email: dbUser.email,
      role: dbUser.role,
    };

    // Create Token
    const token = jwt.sign({ data: payload }, secret, {
      expiresIn: expiration,
    });

    res.status(200).json({ user: dbUser, token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
};
