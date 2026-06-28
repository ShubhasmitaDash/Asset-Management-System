const mongoose = require("mongoose");
const allocationSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true
    },
employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    issueDate: {
      type: Date,
      default: Date.now
    },

    returnDate: Date,

    status: {
      type: String,
      enum: ["Issued", "Returned"],
      default: "Issued"
    },

    remarks: String
  },
  {
    timestamps: true
  }
);

allocationSchema.index({ asset: 1, createdAt: -1 });
allocationSchema.index({ employee: 1, createdAt: -1 });
allocationSchema.index({ status: 1 });

module.exports = mongoose.model("Allocation", allocationSchema);