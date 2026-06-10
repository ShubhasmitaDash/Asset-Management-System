"use client";

import { SidebarNav } from "./sidebar-nav";
import { TopNavbar } from "./top-navbar";
import { StatsCards } from "./stats-cards";
import { AssetsByCategory } from "./assets-by-category";
import { AssetsByStatus } from "./assets-by-status";
import { RecentActivity } from "./recent-activity";
import { RecentAssetsTable } from "./recent-assets-table";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <SidebarNav />

      {/* Top Navbar */}
      <TopNavbar />

      {/* Main Content */}
      <main className="ml-56 mt-16 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, Admin User!</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
            <span>+</span> Add Asset
          </button>
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
            <span>⊞</span> Scan QR Code
          </button>
          <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
            <span>📄</span> Generate Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <StatsCards />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AssetsByCategory />
          <AssetsByStatus />
        </div>

        {/* Recent Activity and Assets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
          <div className="lg:col-span-2">
            <RecentAssetsTable />
          </div>
        </div>
      </main>
    </div>
  );
}
