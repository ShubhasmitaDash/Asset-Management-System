const router = require("express").Router();

const {
    issueAsset,
    returnAsset,
    getAllocations,
    getAllocationById
} = require("../controllers/allocationController");

const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");


// ISSUE ASSET
router.post("/issue", auth, authorize("Admin"), issueAsset);

// RETURN ASSET
router.put("/return/:allocationId", auth, authorize("Admin"), returnAsset);

//GET ALL
router.get("/", auth, authorize("Admin"), getAllocations);

//GET BY ID
router.get("/:id", auth, authorize("Admin"), getAllocationById);

module.exports = router;