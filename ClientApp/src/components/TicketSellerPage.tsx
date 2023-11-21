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
  // ~~~~~~~~~~~~~~~~~~~~~~ Configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~~~
  const isLocalTesting = process.env.REACT_APP_LOCAL_TESTING;
  const port = process.env.REACT_APP_PORT;
  const networkIp = process.env.REACT_APP_NETWORK_IP;
  
  const home = (isLocalTesting === 'true') ? `https://localhost:${port}` : `https://${networkIp}:${port}`;
  const scheduleEndpoint = '/api/movieprogramming';
  const discountsEndpoint = '/api/discount';
  const seatsEndponit = '/api/seats'
  const buyEndpoint = '/api/sales'
  // ~~~~~~~~~~~~~~~~~~~~~~ End configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~


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
            <Route path="/" element={<SellTicketSeller scheduleEndpoint={scheduleEndpoint} seatEndpoint={seatsEndponit} discountEndpoint={discountsEndpoint} buyEndpoint={home + buyEndpoint} />} />
            <Route path="/associate" element={<AssociateTicketSeller/>} />
        </Routes>
    </div>
  );
}

export default TicketSellerPage;