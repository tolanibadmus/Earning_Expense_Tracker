const express = require("express");
const router = express.Router();
const authMiddleware = require("./middlewares/authMiddleware");
const userValidationMiddleware = require("./middlewares/validationMiddleware/userValidation");
const expenseEarningValidationMiddleware = require("./middlewares/validationMiddleware/expenseEarningValidation");
const userController = require("./controllers/user");
const indexController = require("./controllers/index");
const expenseController = require("./controllers/expense");

router.post(
  "/user/register",
  [userValidationMiddleware.registerUser],
  userController.registerUser
);
router.get("/", [authMiddleware], indexController.loadHomePage);
router.get("/expenses", [authMiddleware], expenseController.loadAllExpenses)
router.post(
  "/user/login",
  [userValidationMiddleware.loginUser],
  userController.loginUser
);
router.post(
  "/expense/log",
  [authMiddleware, expenseEarningValidationMiddleware.expenseValidation],
  expenseController.logExpense
);

module.exports = router;
