import React from "react";
import { Route, Routes } from 'react-router-dom';
import { SidebarMenuItem } from "../types/types";
import "./ManagerPage.css";
import { FcClapperboard } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcPieChart } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { GiDramaMasks } from "react-icons/gi";
import { FcConferenceCall } from "react-icons/fc";
import { FcFilmReel } from "react-icons/fc";
import SidebarMenu from "./SidebarMenu";
import MovieManager from "./MovieManager";
import StatsManager from "./StatsManager";
import ScheduleManager from "./ScheduleManager";
import RoomManager from "./RoomManager";
import DiscountManager from "./DiscountManager";
import ActorsManager from "./ActorsManager";
import GenresManager from "./GenresManager";
import CriteriaManager from "./CriteriaManager";

interface Props{
  pathHead: string
}

function ManagerPage({pathHead}: Props) {
  
  // ~~~~~~~~~~~~~~~~~~~~~~ Configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~~~
  const moviesEndpoint = '/api/movie';
  const roomsEndpoint = '/api/room';
  const scheduleEndpoint = '/api/movieprogramming';
  const discountsEndpoint = '/api/discount';
  const actorsEndpoint = '/api/actor';
  const statsEndpoint = './api/statistic';
  const genresEndpoint = '/api/genre';
  const criteriaEndpoint = '/api/criterion/all';
  const activecriteriaEndpoint = '/api/activecriterion';
  const posterEndpoint = '/api/poster'
  // ~~~~~~~~~~~~~~~~~~~~~~ End configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~


  const items: SidebarMenuItem[] = [
    {
      id: "1",
      label: "Dashboard",
      icon: FcPieChart,
      url: `${pathHead}`,
    },
    {
      id: "2",
      label: "Películas",
      icon: FcClapperboard,
      url: `${pathHead}/movies`,
    },
    {
      id: "3",
      label: "Programaciones",
      icon: FcCalendar,
      url: `${pathHead}/schedule`,
    },
    {
      id: "4",
      label: "Salas",
      icon: FcConferenceCall,
      url: `${pathHead}/rooms`,
    },
    {
      id: "5",
      label: "Descuentos",
      icon: FcCurrencyExchange,
      url: `${pathHead}/discounts`
    },
    {
      id: "6",
      label: "Actores",
      icon: FcPortraitMode,
      url: `${pathHead}/actors`
    },
    {
      id: "7",
      label: "Géneros",
      icon: GiDramaMasks,
      url: `${pathHead}/genres`
    },
    {
      id: "8",
      label: "Sugerencias",
      icon: FcFilmReel,
      url: `${pathHead}/criteria`
    }
  ];
  

  return (
    <div className="SidebarPage">
      <div className="item">
        <SidebarMenu items={items} />
      </div>
      <Routes>
        <Route path="/" element={<StatsManager moviesEndpoint={moviesEndpoint} actorsEndpoint={actorsEndpoint} genresEndpoint={genresEndpoint} statsEndpoint={statsEndpoint}/>}/>
        <Route path="/movies" element={<MovieManager name="Películas" moviesEndpoint={moviesEndpoint} actorsEndpoint={actorsEndpoint} genresEndpoint={genresEndpoint} path={moviesEndpoint} posterEndpoint={posterEndpoint} />} />
        <Route path="/schedule" element={<ScheduleManager name="Programaciones" scheduleEndpoint={scheduleEndpoint} moviesEndpoint={moviesEndpoint} roomsEndpoint={roomsEndpoint} path={scheduleEndpoint}/>}/>
        <Route path="/rooms" element={<RoomManager name="Salas" endpoint={roomsEndpoint} path={roomsEndpoint} />}/>
        <Route path="/discounts" element={<DiscountManager name="Descuentos" endpoint={discountsEndpoint} path={discountsEndpoint} />} />
        <Route path="/actors" element={<ActorsManager name="Actores" endpoint={actorsEndpoint} path={actorsEndpoint} />} />
        <Route path="/genres" element={<GenresManager name="Géneros" endpoint={genresEndpoint} path={genresEndpoint} />} />
        <Route path="/criteria" element={<CriteriaManager name="Criterios de Sugerencia" endpoint={criteriaEndpoint} activeEndpoint={activecriteriaEndpoint} activePath={activecriteriaEndpoint} />} />
      </Routes>
    </div>
  );
}

export default ManagerPage;
