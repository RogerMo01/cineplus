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
import SidebarMenu from "./SidebarMenu";
import MovieManager from "./MovieManager";
import StatsManager from "./StatsManager";
import ScheduleManager from "./ScheduleManager";
import RoomManager from "./RoomManager";
import DiscountManager from "./DiscountManager";
import ActorsManager from "./ActorsManager";
import GenresManager from "./GenresManager";

interface Props{
  pathHead: string
}

function ManagerPage({pathHead}: Props) {
  
  // ~~~~~~~~~~~~~~~~~~~~~~ Configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~~~
  const isLocalTesting = process.env.REACT_APP_LOCAL_TESTING;
  const port = process.env.REACT_APP_PORT;
  const networkIp = process.env.REACT_APP_NETWORK_IP;
  
  const home = (isLocalTesting === 'true') ? `https://localhost:${port}` : `https://${networkIp}:${port}`;
  const moviesEndpoint = '/api/movie';
  const roomsEndpoint = '/api/room';
  const scheduleEndpoint = '/api/movieprogramming';
  const discountsEndpoint = '/api/discount';
  const actorsEndpoint = '/api/actor';
  const genresEndpoint = '/api/genre';
  // ~~~~~~~~~~~~~~~~~~~~~~ End configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~


  // ~~~~~~~~~~~ TEMPORAL movies array ~~~~~~~~~~~~~
  // const movies: Movie[] = [
  //   {
  //     id: 1,
  //     title: "The Matrix",
  //     year: 1999,
  //     country: "USA",
  //     director: "The Wachowskis",
  //     duration: 136
  //   },
  //   {
  //     id: 2,
  //     title: "Inception",
  //     year: 2010,
  //     country: "USA",
  //     director: "Christopher Nolan",
  //     duration: 148
  //   },
  //   {
  //     id: 3,
  //     title: "The Shawshank Redemption",
  //     year: 1994,
  //     country: "USA",
  //     director: "Frank Darabont",
  //     duration: 142
  //   },
  //   {
  //     id: 4,
  //     title: "The Godfather",
  //     year: 1972,
  //     country: "USA",
  //     director: "Francis Ford Coppola",
  //     duration: 175
  //   },
  //   {
  //     id: 5,
  //     title: "Pulp Fiction",
  //     year: 1994,
  //     country: "USA",
  //     director: "Quentin Tarantino",
  //     duration: 154
  //   },
  //   {
  //     id: 6,
  //     title: "Forrest Gump",
  //     year: 1994,
  //     country: "USA",
  //     director: "Robert Zemeckis",
  //     duration: 142
  //   },
  //   {
  //     id: 7,
  //     title: "The Dark Knight",
  //     year: 2008,
  //     country: "USA",
  //     director: "Christopher Nolan",
  //     duration: 152
  //   },
  //   {
  //     id: 8,
  //     title: "The Shawshank Redemption",
  //     year: 1994,
  //     country: "USA",
  //     director: "Frank Darabont",
  //     duration: 142
  //   },
  //   {
  //     id: 9,
  //     title: "Avatar",
  //     year: 2009,
  //     country: "USA",
  //     director: "James Cameron",
  //     duration: 162
  //   },
  //   {
  //     id: 10,
  //     title: "Jurassic Park",
  //     year: 1993,
  //     country: "USA",
  //     director: "Steven Spielberg",
  //     duration: 127
  //   },
  // ];
  // // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // //  ~~~~~~~~~~~ TEMPORAL rooms array ~~~~~~~~~~~~~
  // const rooms: Room[] = [
  //   {
  //     id: 1,
  //     name: "Sala Covadonga",
  //     seats: 140
  //   },
  //   {
  //     id: 2,
  //     name: "Sala Alicia Alonso",
  //     seats: 120
  //   },
  //   {
  //     id: 3,
  //     name: "Sala Cobarrubia",
  //     seats: 200
  //   },
  //   {
  //     id: 4,
  //     name: "Sala K",
  //     seats: 45
  //   }
  // ];
  // // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // //  ~~~~~~~~~~~ TEMPORAL schedule array ~~~~~~~~~~~~~
  // const schedule: Schedule[] = [
  //   {
  //     id: 1,
  //     movie: "Lord of Rings",
  //     room: "Sala Alicia Alonso",
  //     date: new Date('2023-12-01T18:30:00'),
  //     price: 10,
  //     points: 120
  //   },
  //   {
  //     id: 2,
  //     movie: "The Matrix",
  //     room: "Sala K",
  //     date: new Date('2023-12-01T18:30:00'),
  //     price: 12,
  //     points: 150
  //   },
  //   {
  //     id: 3,
  //     movie: "Inception",
  //     room: "Sala Covadonga",
  //     date: new Date('2023-12-02T20:00:00'),
  //     price: 11,
  //     points: 130
  //   },
  //   {
  //     id: 4,
  //     movie: "Pulp Fiction",
  //     room: "Sala Covadonga",
  //     date: new Date('2023-12-03T16:45:00'),
  //     price: 9,
  //     points: 110
  //   },
  //   {
  //     id: 5,
  //     movie: "The Shawshank Redemption",
  //     room: "Sala Cobarrubia",
  //     date: new Date('2023-12-04T22:15:00'),
  //     price: 13,
  //     points: 160
  //   },
  // ];
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // const discounts: Discount[] = [
  //   {
  //     id: 1,
  //     concept: "Día del estudiante",
  //     percent: 0.05
  //   },
  //   {
  //     id: 2,
  //     concept: "Día mundial del Cine",
  //     percent: 0.1
  //   },
  //   {
  //     id: 3,
  //     concept: "Por viejo",
  //     percent: 1
  //   }
  // ];

  // const actors: SingleTextModal[] = [
  //   {
  //     id: 1,
  //     name: 'Jack Grealish'
  //   },
  //   {
  //     id: 2,
  //     name: 'Erling Haaland'
  //   },
  //   {
  //     id: 3,
  //     name: 'Paulo Dybala'
  //   },
  //   {
  //     id: 4,
  //     name: 'Julián Álvarez'
  //   }
  // ];

  // const genres: SingleTextModal[] = [
  //   {
  //     id: 1,
  //     name: 'Thriller'
  //   },
  //   {
  //     id: 2,
  //     name: 'Action'
  //   },
  //   {
  //     id: 3,
  //     name: 'Romantic'
  //   },
  //   {
  //     id: 4,
  //     name: 'Terror'
  //   }
  // ];




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
    }
  ];
  

  return (
    <div className="SidebarPage">
      <div className="item">
        <SidebarMenu items={items} />
      </div>
      <Routes>
        <Route path="/" element={<StatsManager/>}/>
        <Route path="/movies" element={<MovieManager name="Películas" moviesEndpoint={moviesEndpoint} actorsEndpoint={actorsEndpoint} genresEndpoint={genresEndpoint} path={home + moviesEndpoint} />} />
        <Route path="/schedule" element={<ScheduleManager name="Programaciones" scheduleEndpoint={scheduleEndpoint} moviesEndpoint={moviesEndpoint} roomsEndpoint={roomsEndpoint} path={home + scheduleEndpoint}/>}/>
        <Route path="/rooms" element={<RoomManager name="Salas" endpoint={roomsEndpoint} path={home + roomsEndpoint} />}/>
        <Route path="/discounts" element={<DiscountManager name="Descuentos" endpoint={discountsEndpoint} path={home + discountsEndpoint} />} />
        <Route path="/actors" element={<ActorsManager name="Actores" endpoint={actorsEndpoint} path={home + actorsEndpoint} />} />
        <Route path="/genres" element={<GenresManager name="Géneros" endpoint={genresEndpoint} path={home + genresEndpoint} />} />
      </Routes>
      
    </div>
  );
}

export default ManagerPage;
