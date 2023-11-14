import React from "react";
import "./MovieManager.css";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Room } from "../types/types";
import RoomModalForm from "./RoomModalForm";

interface Props {
  name: string;
  rooms: Room[];
  path: string;
}

function RoomManager({ name, rooms, path }: Props) {

  async function handleAddRoom(id: number, name: string, seats: number) {
    const request = {
      Name: name,
      SeatsCount: seats
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
      console.log(`Error de inserción (${error})`);
      console.log(`addPath: (${path})`);
      toast.error(`Error de inserción (${error})`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  }

  const handleDeleteRoom = (id: number) => async (e: React.MouseEvent) => {
    try {
      const response = await axios.delete(path + `/${id}`);

      if (response.status === 200) {
        console.log("post success");
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

  async function handleEditRoom(id: number, name: string, seats: number) {
    const request = {
      Name: name,
      SeatsCount: seats
    };

    try {
      const response = await axios.put(path + `/${id}`, request);

      if (response.status === 200) {
        console.log("post success");
        toast.success("Edición exitosa!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(`Error de edición (${error})`);
      console.log(`editPath: (${path})`);
      toast.error(`Error de edición (${error})`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  }

  return (
    <div className="full-container">
      <h2 className="header">{name}</h2>

      <div className="toolButtons">
        <RoomModalForm
          type="new"
          clickHandler={handleAddRoom}
          namePh="Insertar nombre"
          seatsPh={0}
          buttonConfig={{
            className: "align-right",
            color: "primary",
            content: <>Nueva</>,
          }}
          modifyId={-1}
        />
      </div>

      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Butacas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.seats}</td>
                <td className="editColumn">
                  <div className="modifyButtons">
                    <RoomModalForm
                      type="edit"
                      clickHandler={handleEditRoom}
                      namePh={room.name}
                      seatsPh={room.seats}
                      buttonConfig={{
                        className: "modifyButton",
                        color: "secondary",
                        content: <FiEdit2 />,
                      }}
                      modifyId={room.id}
                    />

                    <button
                      className="btn btn-danger modifyButton"
                      onClick={handleDeleteRoom(room.id)}
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

export default RoomManager;
