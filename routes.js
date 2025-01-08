const express = require("express");
const router = express.Router();
const authMiddleware = require("./middlewares/authMiddleware")
const userController = require("./controllers/user");
const indexController = require("./controllers/index");

router.post("/user/register", userController.registerUser);
router.get("/", indexController.loadHomePage);
router.post("/user/login", userController.loginUser)

module.exports = router;
