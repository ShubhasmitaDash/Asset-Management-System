"use client";

import { statsCards } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import {
  Monitor,
  CheckSquare,
  Package,
  Wrench,
  ArrowRight,
} from "lucide-react";

const iconComponentMap: Record<string, React.ReactNode> = {
  monitor: <Monitor className="w-8 h-8" />,
  "check-square": <CheckSquare className="w-8 h-8" />,
  package: <Package className="w-8 h-8" />,
  wrench: <Wrench className="w-8 h-8" />,
};

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <Card key={index} className="p-6 bg-white border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <div style={{ color: stat.color }}>
                {iconComponentMap[stat.icon] || (
                  <Monitor className="w-8 h-8" />
                )}
              </div>
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-2">
            {stat.title}
          </h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            {stat.percentage && (
              <span className="text-sm font-medium text-gray-500">
                {stat.percentage}% of total
              </span>
            )}
          </div>
          {index === 0 && (
            <button className="mt-4 flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all assets <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </Card>
      ))}
    </div>
  );
}
