const Allocation = require("../models/Allocation");

exports.getAssetHistory = async (req, res) => {
  try {
    const history = await Allocation.find({
      asset: req.params.assetId
    })
      .populate("employee")
      .populate("issuedBy")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: history.length,
      data: history
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getEmployeeHistory = async (req, res) => {
  try {
    const history = await Allocation.find({
      employee: req.params.employeeId
    })
      .populate("asset")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: history.length,
      data: history
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};