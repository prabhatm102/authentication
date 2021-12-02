const express =  require("express");
const router = express.Router();
const { addUser } = require("../controller/user");
const { logout } = require("../controller/logout");
const { changePass } = require("../controller/changePass");
const { editProfile } = require("../controller/editProfile.js"); 
const { deleteAccount } = require("../controller/deleteAccount");

const { validate } = require("../validation/user");
const { validateObjectId } = require("../middleware/validate");


// router.get("/:id",[validateObjectId,auth,getUserById]);
router.post("/",validate,addUser);
router.post("/changepassword",changePass);
router.post("/editprofile",editProfile);
router.post("/deleteaccount/:id",[validateObjectId,deleteAccount])
router.post("/:id",[validateObjectId,logout]);



module.exports = router;