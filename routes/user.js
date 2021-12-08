const express =  require("express");
const router = express.Router();
const { addUser, updateUser, updatePass, deleteUser, sendMail} = require("../controller/user");
const { validate } = require("../validation/user");
const { validateEmail } = require("../validation/validateEmail");
const { validatePass } = require("../validation/validatePass");
const { validateObjectId } = require("../middleware/validate");
const auth = require("../middleware/auth");


// router.get("/:id",[validateObjectId,auth,getUserById]);
router.post("/",validate,addUser);
router.post("/sendmail",validateEmail,sendMail);

router.put("/changepassword/",[validatePass,auth,updatePass]);
router.put("/:id",[validateObjectId,validate,updateUser]);

router.delete("/:id",[validateObjectId,deleteUser]);

module.exports = router;