import { BarChart2, Users, Settings } from "react-feather";

export const adminSidebarData = [
  {
    icon: Settings,
    title: "Settings",
    isPrivate: false,
    link: "settings",
  },
  {
    icon: Users,
    title: "Utilisateur",
    isPrivate: false,
    link: "users",
  },
  {
    icon: BarChart2,
    title: "Statistique",
    isPrivate: false,
    link: "stats",
  },
];
