const { body } = require("express-validator");

const validateRegister = [
  body("user_email", "email is required").not().isEmpty(),
  body("user_email", "need a valid email").isEmail(),
  body("user_hash", "password is required").not().isEmpty(),
  body(
    "user_hash",
    "enter a password that has a character length between 8 and 50"
  ).isLength({
    min: 8,
    max: 50,
  }),
];

const validateLogin = [
  body("user_email", "email is required").not().isEmpty().isEmail(),
  body("user_hash", "password is required").not().isEmpty(),
];

const validateRefresh = [
  body("refresh", "refresh token is required")
    .not()
    .isEmpty()
    .isLength({ min: 1 }),
];

module.exports = { validateRegister, validateLogin, validateRefresh };
