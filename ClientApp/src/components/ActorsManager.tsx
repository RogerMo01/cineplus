import React from "react";
import "./MovieManager.css";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { SingleTextModal } from "../types/types";
import ActorsModalForm from "./SingleTextModalForm";

interface Props {
  name: string;
  actors: SingleTextModal[];
  path: string;
}

function ActorsManager({ name, actors, path }: Props) {
  async function handleAdd(id: number, name: string) {
    const request = {
      Name: name,
    };

    try {
      const response = await axios.post(path, request);

      if (response.status === 200) {
        toast.success("Inserción exitosa!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(`Error de inserción (${error})`);
      toast.error(`Error de inserción (${error})`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  }

  const handleDelete = (id: number) => async (e: React.MouseEvent) => {
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
      console.error(`Error de eliminación (${error})`);
      toast.error(`Error de eliminación (${error})`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  async function handleEdit(id: number, name: string) {
    const request = {
      Name: name,
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
      console.error(`Error de edición (${error})`);
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
