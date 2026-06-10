"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAssets } from "@/lib/mock-data";
import { Edit3, QrCode, Trash2, ArrowRight } from "lucide-react";

const statusConfig = {
  Assigned: { color: "bg-green-100 text-green-800" },
  Available: { color: "bg-orange-100 text-orange-800" },
  Maintenance: { color: "bg-red-100 text-red-800" },
};

export function RecentAssetsTable() {
  return (
    <Card className="p-6 bg-white border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Assets</h3>
        <a
          href="#"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View all assets <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Asset ID
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Asset Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Serial Number
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Assigned To
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mockAssets.map((asset) => (
              <tr
                key={asset.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    {asset.id}
                  </a>
                </td>
                <td className="px-4 py-3 text-gray-900">{asset.name}</td>
                <td className="px-4 py-3 text-gray-600">{asset.category}</td>
                <td className="px-4 py-3 text-gray-600 font-mono text-xs">
                  {asset.serialNumber}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    className={`${
                      statusConfig[asset.status as keyof typeof statusConfig]
                        ?.color
                    } border-0`}
                  >
                    {asset.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {asset.assignedTo || "-"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
