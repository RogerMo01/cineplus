import React, { useEffect, useState } from "react";
import "./MovieManager.css";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import { SingleTextModal } from "../types/types";
import ActorsModalForm from "./SingleTextModalForm";
import Post from "./ProcessPost";
import Delete from "./ProcessDelete";
import Put from "./ProcessPut";
import fetch from "./Fetch";

interface Props {
  name: string;
  endpoint: string;
  path: string;
}

function ActorsManager({ name, endpoint, path }: Props) {

  const [actors, setActors] = useState<SingleTextModal[]>([]);

  useEffect(() => {
    fetch(endpoint, setActors);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  async function handleAdd(id: number, name: string) {
    const request = {
      Name: name,
    };

    Post(request, path, endpoint, setActors);
  }

  const handleDelete = (id: number) => async (e: React.MouseEvent) => {
    Delete(id, path, endpoint, setActors);
  };

  async function handleEdit(id: number, name: string) {
    const request = {
      Name: name,
    };

    Put(id, request, path, endpoint, setActors);
  }

  return (
    <div className="full-container">
      <h2 className="header">{name}</h2>

      <div className="toolButtons">
        <ActorsModalForm
          type="new"
          clickHandler={handleAdd}
          namePh="Insertar nombre"
          buttonConfig={{
            className: "align-right",
            color: "primary",
            content: <>Nuevo</>,
          }}
          modifyId={-1}
        />
      </div>

      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {actors.map((actor) => (
              <tr key={actor.id}>
                <td>{actor.name}</td>
                <td className="editColumn">
                  <div className="modifyButtons">
                    <ActorsModalForm
                      type="edit"
                      clickHandler={handleEdit}
                      namePh={actor.name}
                      buttonConfig={{
                        className: "modifyButton",
                        color: "secondary",
                        content: <FiEdit2 />,
                      }}
                      modifyId={actor.id}
                    />

                    <button
                      className="btn btn-danger modifyButton"
                      onClick={handleDelete(actor.id)}
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

export default ActorsManager;
