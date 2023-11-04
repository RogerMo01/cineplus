import React from "react";
import "./MovieManager.css";
import { Movie } from "../types/types";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit2 } from"react-icons/fi";

interface Props {
  name: string;
  movies: Movie[];
}

const headers: string[] = ["Id", "Título", "Año", "País", "Director", "Duración", ""];


function MovieManager({ name, movies }: Props) {
  return (
    <div className="table-container">
      <h2 className="header">{name}</h2>

      <div className="toolButtons">
        <button className="btn btn-primary align-right">Nueva</button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((h) => (
              <th>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr>
              <td>{movie.id}</td>
              <td>{movie.title}</td>
              <td>{movie.year}</td>
              <td>{movie.country}</td>
              <td>{movie.director}</td>
              <td>{movie.duration} min</td>
              <td className="editColumn">
                <div className="editButtons">
                  <button className="btn btn-secondary editButton"><FiEdit2/></button>
                  <button className="btn btn-danger editButton"><RiDeleteBin2Line/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default MovieManager;
