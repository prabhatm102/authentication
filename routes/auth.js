const express =  require("express");
const router = express.Router();
const { auth } = require("../controller/auth");
const { validateLogin } = require("../validation/validateLogin");

router.post("/",validateLogin,auth);

module.exports = router;