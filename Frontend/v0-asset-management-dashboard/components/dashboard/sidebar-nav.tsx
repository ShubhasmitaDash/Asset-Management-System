"use client";

import { navItems } from "@/lib/mock-data";
import {
  Home,
  Box,
  Grid3x3,
  Users,
  Truck,
  Link2,
  Undo,
  Wrench,
  QrCode,
  FileText,
  Bell,
  Settings,
  User,
  LogOut,
  HelpCircle,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="w-5 h-5" />,
  box: <Box className="w-5 h-5" />,
  "grid-3x3": <Grid3x3 className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  truck: <Truck className="w-5 h-5" />,
  "link-2": <Link2 className="w-5 h-5" />,
  undo: <Undo className="w-5 h-5" />,
  wrench: <Wrench className="w-5 h-5" />,
  "qr-code": <QrCode className="w-5 h-5" />,
  "file-text": <FileText className="w-5 h-5" />,
  bell: <Bell className="w-5 h-5" />,
  settings: <Settings className="w-5 h-5" />,
  user: <User className="w-5 h-5" />,
};

export function SidebarNav() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-slate-900 text-white flex flex-col z-50">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm">
            AMS
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-300">ASSET</span>
            <span className="text-xs font-semibold text-gray-300">
              MANAGEMENT SYSTEM
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-slate-800"
                }`}
              >
                {iconMap[item.icon] || <Home className="w-5 h-5" />}
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Help Section */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-900 hover:bg-blue-800 transition-colors text-sm font-medium">
          <HelpCircle className="w-5 h-5" />
          <div className="text-left">
            <div className="font-semibold">Need Help?</div>
            <div className="text-xs text-gray-300">Contact Administrator</div>
          </div>
        </button>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition-colors text-sm font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
}
