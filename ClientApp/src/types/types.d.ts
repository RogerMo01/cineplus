import { IconType } from "react-icons";

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: IconType;
  url: string;
}

export interface SidebarMenuCard {
  id: string;
  displayName: string;
  photoURL: string;
  title: string;
  url: string;
}

export interface Movie {
  id: number;
  title: string;
  year: number;
  country: string;
  director: string;
  duration: number;
}