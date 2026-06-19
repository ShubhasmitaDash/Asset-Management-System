const Allocation = require("../models/Allocation");
const Asset = require("../models/Asset");

// ISSUE ASSET
exports.issueAsset = async (req, res) => {
  try {
    const { assetId, employeeId, remarks } = req.body;

    const asset = await Asset.findById(assetId);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    if (asset.Status === "In Use") {
      return res.status(400).json({
        success: false,
        message: "Asset already assigned",
      });
    }

    const existingAllocation = await Allocation.findOne({
      asset: assetId,
      status: "Issued",
    });

    if (existingAllocation) {
      return res.status(400).json({
        success: false,
        message: "Asset is already allocated",
      });
    }

    const allocation = await Allocation.create({
      asset: assetId,
      employee: employeeId,
      issuedBy: req.user.id,
      issueDate: new Date(),
      remarks,
      status: "Issued",
    });

    asset.Status = "In Use";
    await asset.save();

    return res.status(201).json({
      success: true,
      message: "Asset issued successfully",
      data: allocation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// RETURN ASSET
exports.returnAsset = async (req, res) => {
  try {
    const { allocationId } = req.params;

    const allocation = await Allocation.findById(allocationId);

    if (!allocation) {
      return res.status(404).json({
        success: false,
        message: "Allocation not found",
      });
    }

    if (allocation.status === "Returned") {
      return res.status(400).json({
        success: false,
        message: "Asset already returned",
      });
    }

    allocation.status = "Returned";
    allocation.returnDate = new Date();

    await allocation.save();

    const asset = await Asset.findById(allocation.asset);

    if (asset) {
      asset.Status = "Available";
      await asset.save();
    }

    return res.status(200).json({
      success: true,
      message: "Asset returned successfully",
      data: allocation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL ALLOCATIONS
exports.getAllocations = async (req, res) => {
  try {
    const allocations = await Allocation.find()
      .populate("asset")
      .populate("employee")
      .populate("issuedBy")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Allocations fetched successfully",
      data: allocations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE ALLOCATION
exports.getAllocationById = async (req, res) => {
  try {
    const allocation = await Allocation.findById(req.params.id)
      .populate("asset")
      .populate("employee")
      .populate("issuedBy");

    if (!allocation) {
      return res.status(404).json({
        success: false,
        message: "Allocation not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Allocation fetched successfully",
      data: allocation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};