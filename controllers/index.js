const mysqlPool = require("../db");

async function loadHomePage(req, res) {
  try{
    const [userEarningAndExpenseData] = await mysqlPool.query(`
    SELECT users.id, users.name, SUM (expenses.expense_amount) AS total_expenses,  SUM(earnings.earning_amount) AS total_earnings
    FROM expense_db.users
    JOIN expense_db.expenses ON users.id = expenses.user_id
    JOIN expense_db.earnings ON users.id = earnings.user_id
    GROUP BY users.id, users.name
    `);
    res.json({
      status: true,
      message: "user data loaded successfully",
      data: userEarningAndExpenseData
    })
  } catch(err){
    res.json({
      message: err.message,
    })
  }
  
}


module.exports = {loadHomePage}

