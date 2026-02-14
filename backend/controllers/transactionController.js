const Transaction = require("../models/Transaction");

//     Add transaction
//    POST /api/transactions
exports.addTransaction = async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;

    const transaction = await Transaction.create({
      user: req.user._id,
      title,
      amount,
      category,
      date,
      notes,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to add transaction" });
  }
};

//    Get transactions (Explorer)
//    GET /api/transactions
exports.getTransactions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      min,
      max,
      startDate,
      endDate,
    } = req.query;

    const query = { user: req.user._id };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (min || max) {
      query.amount = {};
      if (min) query.amount.$gte = Number(min);
      if (max) query.amount.$lte = Number(max);
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(query);

    res.json({
      data: transactions,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

//    Update transaction
//    PUT /api/transactions/:id
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    Object.assign(transaction, req.body);
    await transaction.save();

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to update transaction" });
  }
};

//    Delete transaction
//    DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.deleteOne();

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete transaction" });
  }
};
