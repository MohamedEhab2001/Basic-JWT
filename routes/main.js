const express = require("express");
const router = express.Router();
const { login, dashboard } = require("../controllers/main");
const Authorization = require("../middleware/auth");

router.route("/login").post(login);
router.route("/dashboard").get(Authorization, dashboard);

module.exports = router;
