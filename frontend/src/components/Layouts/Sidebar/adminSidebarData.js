import { BarChart2, Users, Settings, Tool } from "react-feather";

export const adminSidebarData = [
  {
    icon: Tool,
    title: "Paramètres",
    isPrivate: false,
    link: "settings",
  },
  {
    icon: Users,
    title: "Utilisateurs",
    isPrivate: false,
    link: "users",
  },
  {
    icon: BarChart2,
    title: "Statistique",
    isPrivate: false,
    link: "statistiques",
  },
];
