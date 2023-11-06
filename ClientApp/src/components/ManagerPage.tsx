import React from "react";
import { Route, Routes } from 'react-router-dom';
import { Movie, SidebarMenuItem } from "../types/types";
import "./ManagerPage.css";
import { FcFilmReel } from "react-icons/fc";
import { FcDoughnutChart } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import SidebarMenu from "./SidebarMenu";
import MovieManager from "./MovieManager";
import StatsManager from "./StatsManager";
import ScheduleManager from "./ScheduleManager";

interface Props{
  pathHead: string
}

function ManagerPage({pathHead}: Props) {

  const items: SidebarMenuItem[] = [
    {
      id: "1",
      label: "Estadísticas",
      icon: FcDoughnutChart,
      url: `${pathHead}/stats`,
    },
    {
      id: "2",
      label: "Películas",
      icon: FcFilmReel,
      url: `${pathHead}/movies`,
    },
    {
      id: "3",
      label: "Programación",
      icon: FcCalendar,
      url: `${pathHead}/schedule`,
    },
  ];
  const movies: Movie[] = [
    {
      id: 1,
      title: "Harry Potter",
      year: 1998,
      country: "United Kingdom",
      director: "Arnold Swarzenager",
      duration: 121
    },
    {
      id: 2,
      title: "Star Wars",
      year: 1992,
      country: "USA",
      director: "Sylvester Stalone",
      duration: 148
    }
  ];


  // ~~~~~~~~~~~~~~~~~~~~~~ Configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~~~
  const isLocalTesting = process.env.REACT_APP_LOCAL_TESTING;
  const port = process.env.REACT_APP_PORT;
  const networkIp = process.env.REACT_APP_NETWORK_IP;
  
  const home = (isLocalTesting === 'true') ? `https://localhost:${port}` : `https://${networkIp}:${port}`;
  
  // 🚨🚨🚨🚨🚨🚨🚨 Fix endpoints 🚨🚨🚨🚨🚨🚨🚨🚨🚨
  const deleteEndpoint = '/api/endpoint';
  const addEndpoint = '/api/endpoint';
  const editEndpoint = '/api/endpoint';
  // ~~~~~~~~~~~~~~~~~~~~~~ End configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~


  return (
    <div className="ManagerPage">
      <div className="item">
        <SidebarMenu items={items} />
      </div>
      <Routes>
        <Route path="/movies" element={<MovieManager name="Películas" movies={movies} deletePath={home + deleteEndpoint} addPath={home + addEndpoint} editPath={home + editEndpoint} />} />
        <Route path="/stats" element={<StatsManager/>}/>
        <Route path="/schedule" element={<ScheduleManager/>}/>
      </Routes>
      
    </div>
  );
}

export default ManagerPage;
