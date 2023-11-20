import React, { useEffect, useState } from "react";
import "./MovieManager.css";
import { RiDeleteBin2Line } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import { SingleTextModal } from "../types/types";
import SingleTextModalForm from "./SingleTextModalForm";
import Post from "./ProcessPost";
import Delete from "./ProcessDelete";
import fetch from "./Fetch";
import Put from "./ProcessPut";

interface Props {
  name: string;
  endpoint: string;
  activeEndpoint: string;
  path: string;
  activePath: string;
}

function CriteriaManager({ name, endpoint, activeEndpoint, path, activePath }: Props) {
//   const criterios = [
//     {
//       id: 1,
//       name: "Dramas",
//     },
//     {
//       id: 2,
//       name: "Thrillers",
//     },
//   ];

  const [criteria, setCriteria] = useState<SingleTextModal[]>([]);
  const [actives, setActives] = useState<{id: number}[]>([]);

  useEffect(() => {
    fetch(endpoint, setCriteria);
    fetch(activeEndpoint, setActives);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(activeEndpoint, setActives);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [criteria]);

  async function handleAdd(id: number, name: string) {
    const request = {
      Name: name,
    };

    Post(request, path, endpoint, setCriteria);
  }

  const handleDelete = (id: number) => async (e: React.MouseEvent) => {
    Delete(id, path, endpoint, setCriteria);
  };

  const handleCheckInput = (id: number) => async (e: React.MouseEvent) => {
    Put(id, {}, activePath , activeEndpoint, setActives)
    // updateActiveCriteria(id);
  }

//   function updateActiveCriteria(id: number) {
//     setActives((prevActives) => {
//       // Si el ID ya está en la lista, lo eliminamos
//       if (prevActives.includes(id)) {
//         return prevActives.filter((activeId) => activeId !== id);
//       } else {
//         // Si el ID no está en la lista, lo agregamos
//         return [...prevActives, id];
//       }
//     });
//   }
  

  return (
    <div className="full-container">
      <h2 className="header">{name}</h2>

      <div className="toolButtons">
        <SingleTextModalForm
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
              <th></th>
              <th>Nombre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((criterion) => (
              <tr key={criterion.id}>
                <td key={criterion.id}>
                  <div key={criterion.id} className="form-check form-switch">
                    <input
                      key={criterion.id}
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`flexSwitchCheck${criterion.id}`}
                      checked={actives.some((active) => active.id === criterion.id)}
                      onClick={handleCheckInput(criterion.id)}
                    />
                  </div>
                </td>
                <td>{criterion.name}</td>
                <td className="editColumn">
                  <div className="modifyButtons">
                    <button
                      className="btn btn-danger modifyButton"
                      onClick={handleDelete(criterion.id)}
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

export default CriteriaManager;
