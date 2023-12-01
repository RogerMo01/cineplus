import React, { useEffect, useState } from "react";
import "./MovieManager.css";
import "react-datepicker/dist/react-datepicker.css";
import { Movie, Room, Schedule } from "../types/types";
import ScheduleModalForm from "./ScheduleModalForm";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import Post from "../utils/ProcessPost";
import Delete from "../utils/ProcessDelete";
import Put from "../utils/ProcessPut";
import fetch from "../utils/Fetch";
import parseDate from "../utils/DateParser";

interface Props {
  name: string;
  scheduleEndpoint: string;
  moviesEndpoint: string;
  roomsEndpoint: string;
  path: string;
}

function ScheduleManager({ name, scheduleEndpoint, moviesEndpoint, roomsEndpoint, path }: Props) {

  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  
  useEffect(() => {
    fetch(moviesEndpoint, setMovies);
    fetch(roomsEndpoint, setRooms);
    fetch(scheduleEndpoint, setSchedule);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ~~~~~~~~~~~~~~~ ADD Handler ~~~~~~~~~~~~~~~~~
  async function handleAddSchedule(id: string, movie: string, room: string, date: Date, price: number, points: number) {

    const request = {
      Movie: movie,
      Room: room,
      Date: date,
      Price: price,
      Points: points,
    };

    Post(request, path, scheduleEndpoint, setSchedule);
  }

  // ~~~~~~~~~~~~~~~ EDIT Handler ~~~~~~~~~~~~~~~~~
  async function handleEditSchedule(id: string, movie: string, room: string, date: Date, price: number, points: number) {

    const request = {
      Movie: movie,
      Room: room,
      Date: date,
      Price: price,
      Points: points,
    };

    Put(id, request, path, scheduleEndpoint, setSchedule);
  }

  // ~~~~~~~~~~~~~~~ DELETE Handler ~~~~~~~~~~~~~~~~~
  const handleDeleteSchedule = (id: string) => async (e: React.MouseEvent) => {
    Delete(id, path, scheduleEndpoint, setSchedule);
  };

  return (
    <div className="full-container">
      <h2 className="header">{name}</h2>

      <div className="toolButtons">
        <ScheduleModalForm
          type="new"
          clickHandler={handleAddSchedule}
          moviePh={movies.length > 0 ? movies[0].title : ""}
          roomPh={rooms.length > 0 ? rooms[0].name : ""}
          datePh={new Date()}
          pricePh={0}
          pointsPricePh={0}
          buttonConfig={{
            className: "align-right",
            color: "primary",
            content: <>Nueva</>,
          }}
          modifyId={"-1"}
          movies={movies}
          rooms={rooms}
        />
      </div>

      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Película</th>
              <th>Sala</th>
              <th>Horario</th>
              <th>Precio</th>
              <th>Puntos</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((s) => (
              <tr key={s.id}>
                <td>{s.movieTitle}</td>
                <td>{s.roomName}</td>
                <td>{parseDate(s.date.toString())}</td>
                <td>$ {s.price}</td>
                <td>{s.points} ptos</td>
                <td className="editColumn">
                  <div className="modifyButtons">
                    <ScheduleModalForm
                      type="edit"
                      clickHandler={handleEditSchedule}
                      moviePh={s.movieTitle}
                      roomPh={s.roomName}
                      datePh={new Date(s.date)}
                      pricePh={s.price}
                      pointsPricePh={s.points}
                      buttonConfig={{
                        className: "modifyButton",
                        color: "secondary",
                        content: <FiEdit2 />,
                      }}
                      modifyId={s.id}
                      movies={movies}
                      rooms={rooms}
                    />

                    <button
                      className="btn btn-danger modifyButton"
                      onClick={handleDeleteSchedule(s.id)}
                    >
                      <RiDeleteBin2Line />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ScheduleManager;
