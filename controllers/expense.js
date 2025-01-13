const mysqlPool = require("../db");

async function logExpense(req, res) {
  try {
    const currentUser = req.decoded;
    const userId = currentUser.id;
    // check if  user exist
    const [userExist] = await mysqlPool.query(
      `
    SELECT * FROM users
    WHERE id = ?`,
      [userId]
    );
    if (!userExist) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }
    //  log user expense after confirming they exist
    const { amount, description } = req.body;
    const [userExpense] = await mysqlPool.query(
      `
    INSERT INTO expenses
    (expense_amount, expense_description, user_id)
    VALUE (?, ?, ?)`,
      [amount, description, userId]
    );
    return res.json({
      success: true,
      message: "Expense logged successfully",
      data: userExpense,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
}

async function loadAllExpenses(req, res) {
  try {
    const currentUser = req.decoded;
    const userId = currentUser.id;
    const [allExpenses] = await mysqlPool.query(
      `SELECT * 
      FROM expenses
      WHERE user_id = ?`,
      [userId]
    );
    if (allExpenses.length === 0){
      return res.json({
        success: true,
        message: "User is yet to log any expense",
        data: allExpenses
      });
    }
    return res.json({
      success: true,
      message: "Expenses loaded successfully",
      data: allExpenses,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
}

module.exports = { logExpense, loadAllExpenses };
