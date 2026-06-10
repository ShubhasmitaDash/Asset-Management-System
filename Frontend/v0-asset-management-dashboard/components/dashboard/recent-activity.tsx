"use client";

import { Card } from "@/components/ui/card";
import { mockActivities } from "@/lib/mock-data";
import {
  CheckCircle,
  PlusCircle,
  ArrowLeftCircle,
  Wrench,
  ArrowRight,
} from "lucide-react";

const activityIconMap: Record<string, React.ReactNode> = {
  "check-circle": <CheckCircle className="w-5 h-5 text-green-500" />,
  "plus-circle": <PlusCircle className="w-5 h-5 text-blue-500" />,
  "arrow-left-circle": <ArrowLeftCircle className="w-5 h-5 text-blue-500" />,
  wrench: <Wrench className="w-5 h-5 text-orange-500" />,
};

export function RecentActivity() {
  return (
    <Card className="p-6 bg-white border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="flex-shrink-0 mt-1">
              {activityIconMap[activity.icon] || (
                <CheckCircle className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium py-2 border-t border-gray-100">
        View all activity <ArrowRight className="w-4 h-4" />
      </button>
    </Card>
  );
}
