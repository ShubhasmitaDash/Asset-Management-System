"use client";

import { Card } from "@/components/ui/card";
import { statusData } from "@/lib/mock-data";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export function AssetsByStatus() {
  return (
    <Card className="p-6 bg-white border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Assets by Status
      </h3>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value.toLocaleString()} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-6 space-y-3 w-full">
          {statusData.map((status, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: status.color }}
                ></div>
                <span className="text-sm text-gray-600">{status.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">
                  {status.value.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {status.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
