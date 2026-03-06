/**
 * Maps icon name strings from site.config.ts to Lucide React components.
 * Add new icon imports here when using them in the config.
 */
import {
  Palette,
  Eye,
  Smartphone,
  Zap,
  Phone,
  MousePointerClick,
  FileText,
  MapPin,
  Shield,
  Star,
  Award,
  Users,
  Clock,
  Heart,
  Code2,
  Layers,
  Database,
  Search,
  FileJson,
  Fingerprint,
  Gauge,
  Globe,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Eye,
  Smartphone,
  Zap,
  Phone,
  MousePointerClick,
  FileText,
  MapPin,
  Shield,
  Star,
  Award,
  Users,
  Clock,
  Heart,
  Code2,
  Layers,
  Database,
  Search,
  FileJson,
  Fingerprint,
  Gauge,
  Globe,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Zap;
}
