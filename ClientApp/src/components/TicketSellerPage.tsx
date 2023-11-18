import React from "react";
import { SidebarMenuItem } from "../types/types";
import { FcCurrencyExchange, FcKindle } from "react-icons/fc";
import "./ManagerPage.css";
import SidebarMenu from "./SidebarMenu";
import { Route, Routes } from "react-router-dom";
import SellTicketSeller from "./SellTicketSeller";
import AssociateTicketSeller from "./AssociateTicketSeller";


interface Props {
  pathHead: string;
}

function TicketSellerPage({ pathHead }: Props) {
  const items: SidebarMenuItem[] = [
    {
      id: "1",
      label: "Vender Ticket",
      icon: FcCurrencyExchange,
      url: `${pathHead}`,
    },
    {
      id: "2",
      label: "Asociar",
      icon: FcKindle,
      url: `${pathHead}/associate`,
    },
  ];

  return (
    <div className="SidebarPage">
        <SidebarMenu items={items} />
        <Routes>
            <Route path="/" element={<SellTicketSeller/>} />
            <Route path="/associate" element={<AssociateTicketSeller/>} />
        </Routes>
    </div>
  );
}

export default TicketSellerPage;
