import {
  Code2,
  Phone,
  TrendingUp,
  RefreshCw,
  Database,
  Server,
  DollarSign,
  Globe,
  ShoppingCart,
  Users,
  Shield,
  Cloud,
  BarChart,
  Smartphone,
  Settings,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Code2,
  Phone,
  TrendingUp,
  RefreshCw,
  Database,
  Server,
  DollarSign,
  Globe,
  ShoppingCart,
  Users,
  Shield,
  Cloud,
  BarChart,
  Smartphone,
  Settings,
};

export const ICON_NAMES = Object.keys(ICONS);

export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Code2;
}
