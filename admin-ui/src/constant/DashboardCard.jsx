import { DollarSign, MonitorPlay, Package, Activity } from 'lucide-react';
 export const DashboardCards =
     [
      {
        icon: DollarSign,
        title: "Invoices Awaiting Payment",
        value: "45",
        total: "76",
        amount: 5569,
        percentage: 56,
        color: "bg-blue-600"
      },
      {
        icon: MonitorPlay,
        title: "Converted Leads",
        value: "48",
        total: "86",
        amount: null,
        percentage: 63,
        color: "bg-orange-500"
      },
      {
        icon: Package,
        title: "Projects In Progress",
        value: "16",
        total: "20",
        amount: null,
        percentage: 78,
        color: "bg-green-500"
      },
      {
        icon: Activity,
        title: "Conversion Rate",
        value: "46.59",
        total: "100",
        amount: 2254,
        percentage: 46,
        color: "bg-red-500"
      }
    ];