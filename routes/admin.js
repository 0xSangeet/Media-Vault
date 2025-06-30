const { Router } = require("express");
const renderDashboard = require("../controllers/admin");

const router = Router();

router.get("/panel", renderDashboard)

module.exports = router;