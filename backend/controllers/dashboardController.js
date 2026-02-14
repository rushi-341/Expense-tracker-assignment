const Transaction = require("../models/Transaction");

//    Get dashboard summary
//    GET /api/dashboard
exports.getDashboardSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    });

    const totalExpense = transactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const categoryBreakdown = {};

    transactions.forEach((t) => {
      if (!categoryBreakdown[t.category]) {
        categoryBreakdown[t.category] = 0;
      }
      categoryBreakdown[t.category] += t.amount;
    });

    const recentTransactions = transactions
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);

    res.json({
      totalExpense,
      categoryBreakdown,
      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard data" });
  }
};
