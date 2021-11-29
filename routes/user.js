const express =  require("express");
const router = express.Router();
const { addUser } = require("../controller/user");
const { validate } = require("../validation/user");

router.post("/",validate,addUser);

module.exports = router;