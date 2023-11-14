import React from "react";
import "./MovieManager.css";
import "react-datepicker/dist/react-datepicker.css";
import { Movie, Room, Schedule } from "../types/types";
import ScheduleModalForm from "./ScheduleModalForm";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import axios, { AxiosError } from "axios";

interface Props {
  name: string;
  schedule: Schedule[];
  movies: Movie[];
  rooms: Room[];
  path: string;
}


function ScheduleManager({ name, schedule, movies, rooms, path }: Props) {

  // ~~~~~~~~~~~~~~~ ADD Handler ~~~~~~~~~~~~~~~~~
  async function handleAddSchedule(id: string, movie: string, room: string, date: Date, price: number, points: number) {

    const request = {
      Movie: movie,
      Room: room,
      Date: date,
      Price: price,
      Points: points,
    };

    try {
      const response = await axios.post(path, request);

      if (response.status === 200) {
        console.log("post success");
        toast.success("Inserción exitosa!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;

        if (axiosError.response) {
          const status = axiosError.response.status;
          const message = axiosError.response.data.message;

          if (status === 409) {
            toast.error(message, { position: "bottom-right", autoClose: 3000 });
          }
        }
      } else{
        console.error(`Error de inserción (${error})`);
        toast.error(`Error de inserción (${error})`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }
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

    try {
      const response = await axios.put(path + `/${id}`, request);

      if (response.status === 200) {
        console.log("put success");
        toast.success("Edición exitosa!", {
        position: "bottom-right",
        autoClose: 3000,
        });
      }
    } catch (error) {

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;

        if (axiosError.response) {
          const status = axiosError.response.status;
          const message = axiosError.response.data.message;

          if (status === 409) {
            toast.error(message, { position: "bottom-right", autoClose: 3000 });
          }
        }
      } else{
        console.error(`Error de edición (${error})`);
        toast.error(`Error de edición (${error})`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }



      
    }
  }

  // ~~~~~~~~~~~~~~~ DELETE Handler ~~~~~~~~~~~~~~~~~
  const handleDeleteSchedule = (id: string) => async (e: React.MouseEvent) => {

    try {
      const response = await axios.delete(path + `/${id}`);
  
      if (response.status === 200) {
        console.log("delete success");
        toast.success("Eliminación exitosa!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(`Error de eliminación (${error})`);
      console.log(`deletePath: (${path})`);
      toast.error(`Error de eliminación (${error})`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  function parseDate(inputDate: string): string{
    const fecha = new Date(inputDate);

    const year = inputDate.substring(0, 4);
    const month = inputDate.substring(5, 7);
    const day = inputDate.substring(8, 10);
    const hours = padZero(String(fecha.getHours() % 12 || 12));
    const minutes = padZero(inputDate.substring(14, 16));
    const ampm = fecha.getHours() >= 12 ? 'PM' : 'AM';

    return `${day}-${month}-${year} / ${hours}:${minutes} ${ampm}`;
  }
  
  function padZero(num: string): string {
    return num.padStart(2, '0');
  }
  
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
                <td>{s.movie}</td>
                <td>{s.room}</td>
                <td>{parseDate(s.date.toString())}</td>
                <td>$ {s.price}</td>
                <td>{s.points} ptos</td>
                <td className="editColumn">
                  <div className="modifyButtons">
                    <ScheduleModalForm
                      type="edit"
                      clickHandler={handleEditSchedule}
                      moviePh={s.movie}
                      roomPh={s.room}
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
