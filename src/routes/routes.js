const express = require("express");
const app = express();
const router = express.Router();
const UserController = require("../controllers/UserController");
const AdminAuth = require("../middleware/AdminAtuh");

router.post("/signin",UserController.Create);
router.post("/login",UserController.login);
router.post("/recover",UserController.recoverPassword);
router.post("/changePass",UserController.alterPassword);
router.post("/validate",AdminAuth,UserController.validate)


module.exports = router;
