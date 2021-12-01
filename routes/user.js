const express =  require("express");
const router = express.Router();
const { addUser, getUserById } = require("../controller/user");
const { validate } = require("../validation/user");
const { validateObjectId } = require("../middleware/validate");
const auth = require("../middleware/auth");
const { logout } = require("../controller/logout");
const { changePass } = require("../controller/changePass");

// router.get("/:id",[validateObjectId,auth,getUserById]);
router.post("/",validate,addUser);
router.post("/changepassword",changePass);
router.post("/:id",[validateObjectId,logout]);

module.exports = router;