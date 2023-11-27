import { IconType } from "react-icons";
import { JwtPayload } from "jwt-decode";

interface AppRoute {
  index?: boolean;
  path?: string;
  element: ReactElement;
}

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

export interface MovieSchedule {
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


export interface UserPayload extends JwtPayload {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  'Nick': string;
}

export interface ShopItem {
  id: string,
  movie: string,
  room: string,
  date: Date,
  datePurchase: Date,
  seat: string,
  payed: number
}

export interface Ticket {
  id: string;
  movie: string;
  room: string;
  date: Date;
  datePurchase: Date;
  seat: string;
  payed: number;
}

export interface IsLiked {
  active: boolean;
}