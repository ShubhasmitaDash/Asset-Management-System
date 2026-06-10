import { Asset, Activity, CategoryData, StatusData, StatCard } from './types';

export const mockAssets: Asset[] = [
  {
    id: "A1001",
    name: "Dell Latitude 5440",
    category: "Laptop",
    serialNumber: "DL544OX123456",
    status: "Assigned",
    assignedTo: "John Doe",
  },
  {
    id: "P2002",
    name: "HP LaserJet Pro",
    category: "Printer",
    serialNumber: "HPLJ123789",
    status: "Available",
  },
  {
    id: "A1003",
    name: "Apple MacBook Air",
    category: "Laptop",
    serialNumber: "MBA2023X456",
    status: "Assigned",
    assignedTo: "Mary Smith",
  },
  {
    id: "M3001",
    name: "Samsung 24\" Monitor",
    category: "Monitor",
    serialNumber: "SM24F450X789",
    status: "Maintenance",
  },
  {
    id: "A1004",
    name: "Logitech Wireless Mouse",
    category: "Accessory",
    serialNumber: "LOGMOU123456",
    status: "Available",
  },
  {
    id: "D2001",
    name: "Dell Desktop PC",
    category: "Desktop",
    serialNumber: "DLTPC123456",
    status: "Assigned",
    assignedTo: "John Doe",
  },
  {
    id: "P2003",
    name: "Canon Printer",
    category: "Printer",
    serialNumber: "CANP123456",
    status: "Assigned",
    assignedTo: "Alex Johnson",
  },
  {
    id: "R1001",
    name: "Cisco Router",
    category: "Router",
    serialNumber: "CISCO123456",
    status: "Available",
  },
];

export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "assignment",
    title: "Dell Laptop (A1001) assigned to John Doe",
    description: "Asset assignment completed",
    timestamp: "2 minutes ago",
    icon: "check-circle",
  },
  {
    id: "2",
    type: "addition",
    title: "HP Printer (P2002) added to inventory",
    description: "New asset added",
    timestamp: "15 minutes ago",
    icon: "plus-circle",
  },
  {
    id: "3",
    type: "return",
    title: "Apple MacBook (A1003) returned by Mary Smith",
    description: "Asset returned to inventory",
    timestamp: "1 hour ago",
    icon: "arrow-left-circle",
  },
  {
    id: "4",
    type: "maintenance",
    title: "Logitech Mouse (A1004) under maintenance",
    description: "Asset sent for repair",
    timestamp: "2 hours ago",
    icon: "wrench",
  },
  {
    id: "5",
    type: "addition",
    title: "New asset category 'Projectors' added",
    description: "Category created",
    timestamp: "3 hours ago",
    icon: "plus-circle",
  },
];

export const categoryData: CategoryData[] = [
  { name: "Laptops", value: 540, percentage: 43.37, color: "#2563EB" },
  { name: "Desktops", value: 320, percentage: 25.7, color: "#8B5CF6" },
  { name: "Printers", value: 150, percentage: 12.05, color: "#F59E0B" },
  { name: "Routers", value: 120, percentage: 9.64, color: "#06B6D4" },
  { name: "Others", value: 115, percentage: 9.24, color: "#EF4444" },
];

export const statusData: StatusData[] = [
  { name: "Assigned", value: 945, percentage: 75.9, color: "#10B981" },
  { name: "Available", value: 210, percentage: 16.87, color: "#F59E0B" },
  { name: "Maintenance", value: 90, percentage: 7.23, color: "#EF4444" },
];

export const statsCards: StatCard[] = [
  {
    title: "Total Assets",
    value: 1245,
    icon: "monitor",
    color: "#2563EB",
  },
  {
    title: "Assigned Assets",
    value: 945,
    percentage: 75.9,
    icon: "check-square",
    color: "#10B981",
  },
  {
    title: "Available Assets",
    value: 210,
    percentage: 16.87,
    icon: "package",
    color: "#F59E0B",
  },
  {
    title: "Under Maintenance",
    value: 90,
    percentage: 7.23,
    icon: "wrench",
    color: "#EF4444",
  },
];

export const navItems = [
  { icon: "home", label: "Dashboard", href: "#" },
  { icon: "box", label: "Assets", href: "#" },
  { icon: "grid-3x3", label: "Categories", href: "#" },
  { icon: "users", label: "Employees", href: "#" },
  { icon: "truck", label: "Vendors", href: "#" },
  { icon: "link-2", label: "Asset Assignment", href: "#" },
  { icon: "undo", label: "Return Assets", href: "#" },
  { icon: "wrench", label: "Maintenance", href: "#" },
  { icon: "qr-code", label: "QR Code Scanner", href: "#" },
  { icon: "file-text", label: "Reports", href: "#" },
  { icon: "bell", label: "Notifications", href: "#" },
  { icon: "settings", label: "Settings", href: "#" },
  { icon: "user", label: "Users", href: "#" },
];
