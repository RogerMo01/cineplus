import React from "react";
import "./MovieManager.css";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Room } from "../types/types";
import RoomModalForm from "./RoomModalForm";
import Post from "./ProcessPost";
import Delete from "./ProcessDelete";
import Put from "./ProcessPut";

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

    Post(request, path);
  }

  const handleDeleteRoom = (id: number) => async (e: React.MouseEvent) => {
    Delete(id, path);
  };

  async function handleEditRoom(id: number, name: string, seats: number) {
    const request = {
      Name: name,
      SeatsCount: seats
    };

    Put(id, request, path);
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
