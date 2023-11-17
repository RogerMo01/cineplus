import React from "react";
import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import ManagerRoutes from "./ManagerRoutes";
import { Layout } from "./components/Layout";
import ManagerNavLinks from "./ManagerNavLinks";
import UnknownNavLinks from "./UnknownNavLinks";
import { UserData } from "./types/types";


function Switch() {


  // 🚨🚨🚨🚨🚨 Logic of token authorization 🚨🚨🚨🚨🚨
  var role = "admin";


  // 🛑🛑🛑 GET request of manager info 🛑🛑🛑
  const managerData: UserData = {
    nick: 'Administrator'
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
    </div>
  );
}

export default Switch;
