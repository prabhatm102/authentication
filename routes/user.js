const express =  require("express");
const router = express.Router();
const { addUser, getUserById } = require("../controller/user");
const { validate } = require("../validation/user");
const { validateObjectId } = require("../middleware/validate");
const auth = require("../middleware/auth");

router.get("/:id",[validateObjectId,auth,getUserById]);
router.post("/",validate,addUser);

module.exports = router;