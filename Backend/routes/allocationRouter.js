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
router.post("/issue", auth, authorize("admin"), issueAsset);

// RETURN ASSET
router.put("/return/:allocationId", auth, authorize("admin"), returnAsset);

//GET ALL
router.get("/", auth, authorize("admin"), getAllocations);

//GET BY ID
router.get("/:id", auth, authorize("admin"), getAllocationById);

module.exports = router;