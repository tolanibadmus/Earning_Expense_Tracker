const mysqlPool = require("../db");

async function loadHomePage(req, res) {
  //  display the user's total earnings, total expenses and balance. 
  try {
    const currentUser = req.decoded;
    const userId = currentUser.id;
    const [userEarningAndExpenseData] = await mysqlPool.query(
      `
    SELECT users.id, 
    COALESCE(SUM (expense_amount), 0) AS total_expenses, 
    COALESCE(SUM(earning_amount), 0) AS total_earnings
    FROM users
    LEFT JOIN expenses ON users.id = expenses.user_id
    LEFT JOIN earnings ON users.id = earnings.user_id
    WHERE users.id = ?
    GROUP BY users.id`,
      [userId]
    );
    const balance = parseInt(userEarningAndExpenseData[0].total_earnings) - parseInt(userEarningAndExpenseData[0].total_expenses)
    res.json({
      status: true,
      message: "user data loaded successfully",
      data: {userEarningAndExpenseData, balance},
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
}

module.exports = { loadHomePage };

