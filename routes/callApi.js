const express =  require("express");
const router = express.Router();
const { addUser, authUser } = require("../controller/callApi");

router.post("/addUser",addUser);
router.post("/authUser",authUser);


module.exports = router;