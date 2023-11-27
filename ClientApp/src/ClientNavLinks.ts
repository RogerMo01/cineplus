import React from "react";
import { NavLinkRoute } from "./types/types";
import { IoDiamond } from "react-icons/io5";


const ClientNavLinks: NavLinkRoute[] = [
  {
    name: "Cartelera",
    route: "/",
  },
  {
    name: "Compras activas",
    route: "/shopping-history"
  },
  {
    name: "Club Cine+",
    route: "/club"
  }
];


export default ClientNavLinks;
