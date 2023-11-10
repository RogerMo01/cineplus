import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { Movie, Room, SidebarMenuItem } from "../types/types";
import "./ManagerPage.css";
import { FcClapperboard } from "react-icons/fc";
import { FcDoughnutChart } from "react-icons/fc";
import { FcCalendar } from "react-icons/fc";
import { FcConferenceCall } from "react-icons/fc";
import SidebarMenu from "./SidebarMenu";
import MovieManager from "./MovieManager";
import StatsManager from "./StatsManager";
import ScheduleManager from "./ScheduleManager";
import axios from "axios";
import RoomManager from "./RoomManager";

interface Props{
  pathHead: string
}

function ManagerPage({pathHead}: Props) {
  
  // ~~~~~~~~~~~~~~~~~~~~~~ Configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~~~
  const isLocalTesting = process.env.REACT_APP_LOCAL_TESTING;
  const port = process.env.REACT_APP_PORT;
  const networkIp = process.env.REACT_APP_NETWORK_IP;
  
  const home = (isLocalTesting === 'true') ? `https://localhost:${port}` : `https://${networkIp}:${port}`;
  
  // 🚨🚨🚨🚨🚨🚨🚨 Fix endpoints 🚨🚨🚨🚨🚨🚨🚨🚨🚨
  const getMoviesEndpoint = '/api/endpoint';
  const deleteMovieEndpoint = '/api/endpoint';
  const addMovieEndpoint = '/api/endpoint';
  const editMovieEndpoint = '/api/endpoint';

  const getRoomsEndpoint = '/api/endpoint';
  const deleteRoomEndpoint = '/api/endpoint';
  const addRoomEndpoint = '/api/endpoint';
  const editRoomEndpoint = '/api/endpoint';
  // ~~~~~~~~~~~~~~~~~~~~~~ End configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~

  
  // ~~~~~~~~~~~~~~~~ GET movies ~~~~~~~~~~~~~~~~~~~~
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   axios.get(getMoviesEndpoint)
  //   .then((response) => {
  //     if (response.status === 200) {
  //       console.log('Solicitud GET con éxito');
  //       setMovies(response.data);
  //     }
  //   }).catch((error) => {
  //     console.error('Error al enviar la solicitud:', error);
  //   })
  // }, []);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  // ~~~~~~~~~~~ TEMPORAL movies array ~~~~~~~~~~~~~
  const movies: Movie[] = [
    {
      id: 1,
      title: "The Matrix",
      year: 1999,
      country: "USA",
      director: "The Wachowskis",
      duration: 136
    },
    {
      id: 2,
      title: "Inception",
      year: 2010,
      country: "USA",
      director: "Christopher Nolan",
      duration: 148
    },
    {
      id: 3,
      title: "The Shawshank Redemption",
      year: 1994,
      country: "USA",
      director: "Frank Darabont",
      duration: 142
    },
    {
      id: 4,
      title: "The Godfather",
      year: 1972,
      country: "USA",
      director: "Francis Ford Coppola",
      duration: 175
    },
    {
      id: 5,
      title: "Pulp Fiction",
      year: 1994,
      country: "USA",
      director: "Quentin Tarantino",
      duration: 154
    },
    {
      id: 6,
      title: "Forrest Gump",
      year: 1994,
      country: "USA",
      director: "Robert Zemeckis",
      duration: 142
    },
    {
      id: 7,
      title: "The Dark Knight",
      year: 2008,
      country: "USA",
      director: "Christopher Nolan",
      duration: 152
    },
    {
      id: 8,
      title: "The Shawshank Redemption",
      year: 1994,
      country: "USA",
      director: "Frank Darabont",
      duration: 142
    },
    {
      id: 9,
      title: "Avatar",
      year: 2009,
      country: "USA",
      director: "James Cameron",
      duration: 162
    },
    {
      id: 10,
      title: "Jurassic Park",
      year: 1993,
      country: "USA",
      director: "Steven Spielberg",
      duration: 127
    },
  ];
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  ~~~~~~~~~~~ TEMPORAL rooms array ~~~~~~~~~~~~~
  const rooms: Room[] = [
    {
      id: 1,
      name: "Sala Covadonga",
      seats: 140
    },
    {
      id: 2,
      name: "Sala Alicia Alonso",
      seats: 120
    },
    {
      id: 3,
      name: "Sala Cobarrubia",
      seats: 200
    },
    {
      id: 4,
      name: "Sala K",
      seats: 45
    }
  ];
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
  ];

  

  return (
    <div className="ManagerPage">
      <div className="item">
        <SidebarMenu items={items} />
      </div>
      <Routes>
        <Route path="/movies" element={<MovieManager name="Películas" movies={movies} deletePath={home + deleteMovieEndpoint} addPath={home + addMovieEndpoint} editPath={home + editMovieEndpoint} />} />
        <Route path="/stats" element={<StatsManager/>}/>
        <Route path="/schedule" element={<ScheduleManager/>}/>
        <Route path="/rooms" element={<RoomManager name="Salas" rooms={rooms} deletePath={home + deleteRoomEndpoint} addPath={home + addRoomEndpoint} editPath={home + editRoomEndpoint} />}/>
      </Routes>
      
    </div>
  );
}

export default ManagerPage;
