"use client";

import { Card } from "@/components/ui/card";
import { categoryData } from "@/lib/mock-data";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

export function AssetsByCategory() {
  return (
    <Card className="p-6 bg-white border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Assets by Category
      </h3>
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => value.toLocaleString()} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-6 grid grid-cols-2 gap-4 w-full">
          {categoryData.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="text-sm text-gray-600">
                {category.name}{" "}
                <span className="font-semibold text-gray-900">
                  {category.value.toLocaleString()}
                </span>{" "}
                ({category.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
