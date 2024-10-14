const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
  try {
    const { amount } = req.body;
    const transaction = new Transaction({ user: req.user.id, amount });
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.completeTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    transaction.status = 'completed';
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
