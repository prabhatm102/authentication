const express =  require("express");
const router = express.Router();
const { validateEmail } = require("../validation/validateEmail");
const { sendmail } = require("../controller/sendmail");

router.post("/",validateEmail,sendmail);

module.exports = router;