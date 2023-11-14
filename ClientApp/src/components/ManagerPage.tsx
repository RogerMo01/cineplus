import React, { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import { SidebarMenuItem } from "../types/types";
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
  const moviesEndpoint = '/api/movie';
  const roomsEndpoint = '/api/room';
  const scheduleEndpoint = '/api/movieprogramming';
  // ~~~~~~~~~~~~~~~~~~~~~~ End configure endpoints ~~~~~~~~~~~~~~~~~~~~~~~~

  
  // ~~~~~~~~~~~~~~~~ GET movies ~~~~~~~~~~~~~~~~~~~~
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(moviesEndpoint)
    .then((response) => {
      if (response.status === 200) {
        console.log('Solicitud GET con éxito');
        setMovies(response.data);
      }
    }).catch((error) => {
      console.error('Error al enviar la solicitud:', error);
    })
  }, []);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~ GET rooms ~~~~~~~~~~~~~~~~~~~~
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get(roomsEndpoint)
    .then((response) => {
      if (response.status === 200) {
        console.log('Solicitud GET con éxito');
        setRooms(response.data);
      }
    }).catch((error) => {
      console.error('Error al enviar la solicitud:', error);
    })
  }, []);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~ GET schedule ~~~~~~~~~~~~~~~~~~~~
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    axios.get(scheduleEndpoint)
    .then((response) => {
      if (response.status === 200) {
        console.log('Solicitud GET con éxito');
        setSchedule(response.data);
      }
    }).catch((error) => {
      console.error('Error al enviar la solicitud:', error);
    })
  }, []);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


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




  const items: SidebarMenuItem[] = [
    {
      id: "1",
      label: "Estadísticas",
      icon: FcDoughnutChart,
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
  ];
  

  return (
    <div className="ManagerPage">
      <div className="item">
        <SidebarMenu items={items} />
      </div>
      <Routes>
        <Route path="/" element={<StatsManager/>}/>
        <Route path="/movies" element={<MovieManager name="Películas" movies={movies} path={home + moviesEndpoint} />} />
        <Route path="/schedule" element={<ScheduleManager name="Programaciones" schedule={schedule} movies={movies} rooms={rooms} path={home + scheduleEndpoint}/>}/>
        <Route path="/rooms" element={<RoomManager name="Salas" rooms={rooms} path={home + roomsEndpoint} />}/>
      </Routes>
      
    </div>
  );
}

export default ManagerPage;
