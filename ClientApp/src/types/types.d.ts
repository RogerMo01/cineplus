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
  actors: SingleTextModal[];
  genres: SingleTextModal[];
  duration: number;
}

export interface Room {
  id: number;
  name: string;
  seats: number;
}

export interface ButtonConfig {
  className: string;
  color: string;
  content: JSX.Element;
}

export interface Schedule {
  id: string;
  movie: string;
  room: string;
  date: Date;
  price: number;
  points: number;
}

export interface NavLinkRoute {
  name: string;
  route: string;
}

export interface UserData {
  nick: string;
}

export interface Discount {
  id: number;
  concept: string;
  percent: number;
}

export interface SingleTextModal {
  id: number,
  name: string
}

export interface Seat {
  code: string
}

export interface MovieCard {
  id: string,
  img: string,
  title: string,
  year: number,
  genres: string[],
  actors: string[]
}

export interface Criterion {
  id: number,
  name: string
}