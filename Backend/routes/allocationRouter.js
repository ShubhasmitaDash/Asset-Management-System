const router = require("express").Router();
const { issueAsset, returnAsset, getAllocationById } = require("../controllers/allocationController");
const User = require("../models/User");

// GET /api/allocations → returns employees list for the frontend
router.get("/", async (req, res) => {
  try {
    const employees = await User.find({ Role: 'Employee' });  // ← no .select('-Password') needed
    const mapped = employees.map(e => ({
      _id: e._id,
      id: e.Emp_ID ||e._id,
      empId: e.Emp_ID || e._id,
      name: e.User_Name,
      email: e.Email,
      department: e.Department,
      designation: e.Designation,
      phone: e.Phone,
    }));
    res.json({ success: true, data: mapped });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

router.post("/issue", issueAsset);
router.put("/return/:allocationId", returnAsset);
router.get("/:id", getAllocationById);

module.exports = router;