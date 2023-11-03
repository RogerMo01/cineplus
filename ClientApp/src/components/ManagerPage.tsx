import React from "react";
import SidebarMenu from "./SidebarMenu";
import { SidebarMenuItem } from "../types/types";
import { FcAdvertising } from "react-icons/fc";
import './ManagerPage.css'

function ManagerPage() {

  const items: SidebarMenuItem[] = [
    {
      id: "1",
      label: "Item1",
      icon: FcAdvertising,
      url: "/",
    },
    {
        id: "2",
        label: "Item2",
        icon: FcAdvertising,
        url: "/",
    },
    {
        id: "3",
        label: "Item3",
        icon: FcAdvertising,
        url: "/",
      }
  ];
  

  return (
    <div className="ManagerPage" >
      <SidebarMenu items={items} />
      
    </div>
  );
}

export default ManagerPage;
