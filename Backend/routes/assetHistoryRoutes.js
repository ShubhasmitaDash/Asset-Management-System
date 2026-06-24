const router = require("express").Router();

const {
  getAssetHistory,
  getEmployeeHistory
} = require("../controllers/assetHistoryController");

const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

router.get("/asset/:assetId", auth, authorize("Admin"), getAssetHistory);

router.get("/employee/:employeeId", auth, authorize("Admin"), getEmployeeHistory);

module.exports = router;