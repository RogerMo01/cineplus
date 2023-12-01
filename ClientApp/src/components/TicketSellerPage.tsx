import React from "react";
import { SidebarMenuItem } from "../types/types";
import { FcCurrencyExchange, FcKindle, FcSearch } from "react-icons/fc";
import "./ManagerPage.css";
import SidebarMenu from "./SidebarMenu";
import { Route, Routes } from "react-router-dom";
import SellTicketSeller from "./SellTicketSeller";
import MemberSignUpForm from "./MemberSignUpForm";
import SearchMember from "./SearchMember";


interface Props {
  pathHead: string;
}

function TicketSellerPage({ pathHead }: Props) {
  // ~~~~~~~~~~~~~~~~~~~~~~ Configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~~~
  const scheduleEndpoint = '/api/availableprogramming';
  const discountsEndpoint = '/api/discount';
  const seatsEndponit = '/api/seats'
  const buyEndpoint = '/api/sales'
  const membersEndpoint = '/api/associate'
  // const memberPointsEndpoint = '/api/associate/points'
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
    {
      id: "3",
      label: "Buscar códigos",
      icon: FcSearch,
      url: `${pathHead}/search-member`,
    }
  ];

  return (
    <div className="SidebarPage">
        <SidebarMenu items={items} />
        <Routes>
            <Route path="/" element={<SellTicketSeller scheduleEndpoint={scheduleEndpoint} seatEndpoint={seatsEndponit} discountEndpoint={discountsEndpoint} buyEndpoint={buyEndpoint} membersEndpoint={membersEndpoint} />} />
            <Route path="/associate" element={<MemberSignUpForm header="Asociar cliente" endpoint={membersEndpoint}/>} />
            <Route path="/search-member" element={<SearchMember endpoint={membersEndpoint} />} />
        </Routes>
    </div>
  );
}

export default TicketSellerPage;
