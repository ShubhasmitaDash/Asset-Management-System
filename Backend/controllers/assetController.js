const { generateCodes } = require("../services/qrService");
const Asset = require("../models/Asset");

const createAsset = async (req, res) => {
  try {
    const count = await Asset.countDocuments();
    const assetId = "A" + String(1001 + count);

    const newAsset = new Asset({
      ...req.body,
      Asset_ID: assetId
    });

    const savedAsset = await newAsset.save();

    const qrData = await generateCodes({
      asset_id: assetId,
      asset_name: savedAsset.Asset_Name,
      category: savedAsset.Asset_Type,
      serial_number: savedAsset.Serial_No,
      status: savedAsset.Status
    });

    if (qrData) {
      savedAsset.QR_Code_Path = qrData.qr_code_url;
      savedAsset.Barcode_Path = qrData.barcode_url;

      await savedAsset.save();
    }

    res.status(201).json({
      success: true,
      message: "Asset created successfully",
      data: savedAsset
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { createAsset };