import React, { useEffect, useState } from "react";
import "./MovieManager.css";
import { ToastContainer } from "react-toastify";
import { SingleTextModal } from "../types/types";
import fetch from "../utils/Fetch";
import Put from "../utils/ProcessPut";

interface Props {
  name: string;
  endpoint: string;
  activeEndpoint: string;
  activePath: string;
}

function CriteriaManager({ name, endpoint, activeEndpoint, activePath }: Props) {

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

  const handleCheckInput = (id: number) => async (e: React.MouseEvent) => {
    Put(id, {}, activePath , activeEndpoint, setActives)
  }


  return (
    <div className="full-container">
      <h2 className="header">{name}</h2>


      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Mostrar</th>
              <th>Nombre</th>
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
