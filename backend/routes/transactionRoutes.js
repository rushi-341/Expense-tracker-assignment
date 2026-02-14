const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.route("/")
  .post(protect, addTransaction)
  .get(protect, getTransactions);

router.route("/:id")
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;
