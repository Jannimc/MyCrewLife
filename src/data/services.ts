import { Home, Sparkles, Brush, Key, Box, Building, SprayCan, Hammer, Store } from 'lucide-react';

export const services = {
  home: [
    {
      icon: Home,
      title: "Regular Home Cleaning",
      description: "Weekly or bi-weekly cleaning to keep your home spotless",
      features: ["Dusting & wiping", "Vacuuming & mopping", "Kitchen & bathroom cleaning", "Bed making"]
    },
    {
      icon: Sparkles,
      title: "Deep Cleaning",
      description: "Thorough cleaning of every nook and cranny",
      features: ["Inside cabinets", "Behind appliances", "Window cleaning", "Deep carpet cleaning"]
    },
    {
      icon: Brush,
      title: "Spring Cleaning",
      description: "Annual deep clean to refresh your space",
      features: ["Seasonal decluttering", "Deep sanitization", "Window washing", "Furniture cleaning"]
    }
  ],
  moving: [
    {
      icon: Key,
      title: "End of Tenancy",
      description: "Get your deposit back with our thorough cleaning",
      features: ["Full property cleaning", "Oven & appliance cleaning", "Carpet deep clean", "Window cleaning"]
    },
    {
      icon: Box,
      title: "Move In/Out Cleaning",
      description: "Start fresh in your new home",
      features: ["Pre-move cleaning", "Post-move cleaning", "Cabinet sanitization", "Floor restoration"]
    },
    {
      icon: Hammer,
      title: "Post-Renovation Cleaning",
      description: "Professional cleanup after construction or renovation",
      features: ["Construction debris removal", "Dust & particle cleaning", "Surface sanitization", "Paint spot removal"]
    }
  ],
  commercial: [
    {
      icon: Building,
      title: "Office Cleaning",
      description: "Professional cleaning services for workspaces",
      features: ["Workspace sanitization", "Kitchen & break rooms", "Meeting rooms", "Reception areas"]
    },
    {
      icon: SprayCan,
      title: "Disinfection Service",
      description: "Sanitization and disinfection of high-touch areas",
      features: ["Surface disinfection", "Air purification", "Touch point cleaning", "EPA-approved products"]
    },
    {
      icon: Store,
      title: "Retail Store Cleaning",
      description: "Comprehensive cleaning for retail environments",
      features: ["Floor maintenance", "Window cleaning", "Display area dusting", "High-touch sanitization"]
    }
  ]
};