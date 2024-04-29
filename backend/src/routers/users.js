const express = require("express");
const {
  getAllUsers,
  seedUsers,
  register,
  login,
  refresh,
  update,
} = require("../controllers/users");
const { errorCheck } = require("../validators/errorCheck");
const {
  validateLogin,
  validateRegister,
  validateRefresh,
} = require("../validators/users");
const { authAdmin, authUser } = require("../middleware/users");

const router = express.Router();

// router.get("/allUsers", authAdmin, getAllUsers);
router.get("/allUsers", getAllUsers);
router.get("/seedUsers", seedUsers);
router.put("/register", validateRegister, errorCheck, register);
router.post("/login", validateLogin, errorCheck, login);
// router.post("/refresh", authUser, validateRefresh, errorCheck, refresh);
router.post("/refresh", validateRefresh, errorCheck, refresh);
router.patch("/update/:user_id", validateRegister, errorCheck, update);
// router.patch(
//     "/update/:user_id",
//     authAdmin,
//     validateRegister,
//     errorCheck,
//     update
//   );

module.exports = router;
