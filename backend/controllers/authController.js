const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ error: info ? info.message : 'Login failed' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  })(req, res, next);
};

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect('/login?error=Google authentication failed');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect(`/auth/success?token=${token}&userId=${user.id}&username=${user.username}&email=${user.email}`);
  })(req, res, next);
};

exports.metamaskAuth = async (req, res) => {
  try {
    const { publicAddress, signature } = req.body;

    // Verify the signature here (you'll need to implement this)
    // const isValidSignature = verifySignature(publicAddress, signature);
    // if (!isValidSignature) {
    //   return res.status(400).json({ error: 'Invalid signature' });
    // }

    let user = await User.findOne({ publicAddress });

    if (!user) {
      user = new User({ publicAddress, username: `user_${publicAddress.slice(0, 8)}` });
      await user.save();
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, username: user.username, publicAddress: user.publicAddress } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};