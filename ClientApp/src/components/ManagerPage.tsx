import React from "react";
import SidebarMenu from "./SidebarMenu";
import { Movie, SidebarMenuItem } from "../types/types";
import "./ManagerPage.css";
import { FcFilmReel } from "react-icons/fc";
import { FcDoughnutChart } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import MovieManager from "./MovieManager";

function ManagerPage() {
  
  const items: SidebarMenuItem[] = [
    {
      id: "1",
      label: "Estadísticas",
      icon: FcDoughnutChart,
      url: "/",
    },
    {
      id: "2",
      label: "Películas",
      icon: FcFilmReel,
      url: "/manage-movies",
    },
    {
      id: "3",
      label: "Programación",
      icon: FcCalendar,
      url: "/",
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
      <MovieManager name="Películas" movies={movies} deletePath={home + deleteEndpoint} addPath={home + addEndpoint} editPath={home + editEndpoint} />
    </div>
  );
}

export default ManagerPage;
