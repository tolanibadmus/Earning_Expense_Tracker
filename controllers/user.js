const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysqlPool = require("../db");

async function registerUser(req, res) {
  const { email, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // check if a user exist with the email address
    const [userExist] = await mysqlPool.query(
      `SELECT *
    FROM users
    WHERE email = ? `,
      [email]
    );
    if (userExist.length < 1) {
      const [registerUser] = await mysqlPool.query(
        `INSERT INTO users
        (name, email, password)
        VALUE (?, ?, ?)`,
        [name, email, hashedPassword]
      );
      return res.json({
        status: true,
        message: "User added successfully",
        data: { insertID: registerUser.insertId },
      });
    } else {
      return res.json({
        status: false,
        message: "Email address has already been used",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const [getTheUser] = await mysqlPool.query(
      `SELECT *
      FROM users
      WHERE email = ? `,
      [email]
    );
    if (getTheUser) {
      const passwordInDb = getTheUser[0].password;
      const isMatch = await bcrypt.compare(password, passwordInDb);
      if (isMatch) {
        const jwtSecret = process.env.JWT_SECRET;
        const expirationInHours = "1000h";
  
        const token = jwt.sign(
          {
            id: getTheUser[0].id,
            email: getTheUser[0].email,
          },
          jwtSecret,
          {
            expiresIn: expirationInHours,
          }
        );

        return res.json({
          success: true,
          message: "User logged in successfully",
          data: getTheUser,
          token: token,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Password incorrect",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
}

module.exports = { registerUser, loginUser };
