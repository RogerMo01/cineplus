import React, { useEffect, useState } from "react";
import "./IsMemberView.css";
import fetch from "./Fetch";

// const code = "H6E3DC8";
// const points = 70;

interface Props {
    endpoint: string
}

function IsMemberView({endpoint} : Props) {
  const [data, setData] = useState<{code: string, points: number}>();

  useEffect(() => {
    fetch(endpoint, setData)
  }, [])
  

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2>Mis Datos</h2>
      <img
        className="img-fluid"
        width={300}
        height={60}
        src="club_diamond.png"
        alt="club_diamond"
      />

      <div
        className="club-container border rounded alert alert-info"
        role="alert"
      >
        <div className="mt-3 d-flex flex-column align-items-center">
          <label className="club-label">Código de Miembro:</label>
          <p className="club-p">{data?.code}</p>
        </div>
        <div className="mt-3 d-flex flex-column align-items-center">
          <label className="club-label">Puntos:</label>
          <p className="club-p">{data?.points}</p>
        </div>
      </div>
    </div>
  );
}

export default IsMemberView;
