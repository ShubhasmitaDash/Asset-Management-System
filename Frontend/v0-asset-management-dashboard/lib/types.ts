export interface Asset {
  id: string;
  name: string;
  category: string;
  serialNumber: string;
  status: "Assigned" | "Available" | "Maintenance";
  assignedTo?: string;
}

export interface Activity {
  id: string;
  type: "assignment" | "addition" | "return" | "maintenance";
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface StatusData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface StatCard {
  title: string;
  value: number;
  percentage?: number;
  icon: string;
  color: string;
}
