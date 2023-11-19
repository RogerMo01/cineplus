import React from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import ManagerRoutes from "./ManagerRoutes";
import { Layout } from "./components/Layout";
import ManagerNavLinks from "./ManagerNavLinks";
import UnknownNavLinks from "./UnknownNavLinks";
import { UserData } from "./types/types";
import TicketsellerNavList from "./TicketsellerNavList";
import TicketsellerRoutes from "./TicketsellerRoutes";
import ClientNavLinks from "./ClientNavLinks";
import ClientRoutes from "./ClientRoutes";
import Footer from "./components/Footer";


function Switch() {


  // 🚨🚨🚨🚨🚨 Logic of token authorization 🚨🚨🚨🚨🚨
  var role = "unknown";


  // 🛑🛑🛑 GET request of manager info 🛑🛑🛑
  const managerData: UserData = {
    nick: 'Administrator'
  }

  const ticketsellerData: UserData = {
    nick: 'Taquillero 1'
  }

  const clientData: UserData = {
    nick: 'John Doe'
  }


  return (
    <div>
      {role === "unknown" && (
        <Layout navLinks={UnknownNavLinks}>
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
          <Footer/>
        </Layout>
      )}
      {role === "admin" && (
        <Layout navLinks={ManagerNavLinks} userData={managerData}>
          <Routes>
            {ManagerRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </Layout>
      )}
      {role === "seller" && (
        <Layout navLinks={TicketsellerNavList} userData={ticketsellerData}>
          <Routes>
            {TicketsellerRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </Layout>
      )}
      {role === "client" && (
        <Layout navLinks={ClientNavLinks} userData={clientData}>
          <Routes>
            {ClientRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </Layout>
      )}
    </div>
  );
}

export default Switch;
