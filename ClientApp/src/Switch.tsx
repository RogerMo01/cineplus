import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UnknownUserRoutes from "./UnknownUserRoutes";
import ManagerRoutes from "./ManagerRoutes";
import { Layout } from "./components/Layout";
import ManagerNavLinks from "./ManagerNavLinks";
import UnknownNavLinks from "./UnknownNavLinks";
import { UserData, UserPayload } from "./types/types";
import TicketsellerNavList from "./TicketsellerNavList";
import TicketsellerRoutes from "./TicketsellerRoutes";
import ClientNavLinks from "./ClientNavLinks";
import ClientRoutes from "./ClientRoutes";
import Footer from "./components/Footer";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ValidateSession } from "./components/ValidateSession";


function Switch() {

  const [token, setToken] = useState(localStorage.getItem('sessionToken'));
  const [role, setRole] = useState('unknown');
  const [nick, setNick] = useState('unknown');


  useEffect(() => {
    if(token){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const decodedToken = jwtDecode<UserPayload>(token);
      const newRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const newNick = decodedToken['Nick'];
      const expTime = decodedToken.exp ? new Date(decodedToken.exp * 1000) : null

      if(expTime && expTime < new Date()){
        setRole('unknown');
        setNick('unknown');
      }
      else{
        setRole(newRole);
        setNick(newNick);
      }
    }
    else{
      setRole('unknown');
      setNick('unknown');
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])
  
  // Checks for token expiration
  ValidateSession(setToken);

  const userData: UserData = {
    nick: nick
  }


  return (
    <div>
      {role === "unknown" && (
        <Layout navLinks={UnknownNavLinks}>
          <Routes>
            {UnknownUserRoutes(setToken).map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
          <Footer/>
        </Layout>
      )}
      {role === "admin" && (
        <Layout navLinks={ManagerNavLinks} userData={userData} tokenSetter={setToken}>
          <Routes>
            {ManagerRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </Layout>
      )}
      {role === "seller" && (
        <Layout navLinks={TicketsellerNavList} userData={userData} tokenSetter={setToken}>
          <Routes>
            {TicketsellerRoutes().map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        </Layout>
      )}
      {role === "client" && (
        <Layout navLinks={ClientNavLinks} userData={userData} tokenSetter={setToken}>
          <Routes>
            {ClientRoutes().map((route, index) => {
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
