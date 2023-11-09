import React from "react";
import "./MovieManager.css";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import { Room } from "../types/types";
import RoomModalForm from "./RoomModalForm";

interface Props {
  name: string;
  rooms: Room[];
  deletePath: string;
  addPath: string;
  editPath: string;
}

function RoomManager({ name, rooms, deletePath, addPath, editPath }: Props) {
  async function handleAddRoom(id: number, name: string, seats: number) {
    alert("Try to add new room: " + name);

    const request = {
      Name: name,
      Seats: seats
    };

    try {
      const response = await axios.post(addPath, request);

      if (response.status === 200) {
        console.log("post success");
        toast.success("Inserción exitosa!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(`Error de inserción (${error})`);
      console.log(`addPath: (${addPath})`);
      toast.error(`Error de inserción (${error})`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  }

  const handleDeleteRoom = (id: number) => async (e: React.MouseEvent) => {
    alert("Try to delete room with id=" + id);

    try {
      const response = await axios.delete(deletePath + `/${id}`);

      if (response.status === 200) {
        console.log("post success");
        toast.success("Eliminación exitosa!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(`Error de eliminación (${error})`);
      console.log(`deletePath: (${deletePath})`);
      toast.error(`Error de eliminación (${error})`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  async function handleEditRoom(id: number, name: string) {
    alert("Try to edit room: " + name);

    const request = {
      Name: name,
    };

    try {
      const response = await axios.put(editPath + `/${id}`, request);

      if (response.status === 200) {
        console.log("post success");
        toast.success("Inserción exitosa!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(`Error de edición (${error})`);
      console.log(`editPath: (${editPath})`);
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
              <th>Id</th>
              <th>Nombre</th>
              <th>Butacas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
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
    </div>
  );
}

export default RoomManager;
