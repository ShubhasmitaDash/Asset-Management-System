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
router.post("/issue",                            issueAsset);

// RETURN ASSET
router.put("/return/:allocationId",              returnAsset);

//GET ALL
router.get("/",                                  getAllocations);

//GET BY ID
router.get("/:id",                               getAllocationById);

module.exports = router;