import React from "react";
import "./MovieManager.css";
import { Movie } from "../types/types";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import MovieModalForm from "./MovieModalForm";
import Post from "./ProcessPost";
import Delete from "./ProcessDelete";
import Put from "./ProcessPut";

interface Props {
  name: string;
  movies: Movie[];
  path: string;
}

function MovieManager({ name, movies, path }: Props) {

  // ~~~~~~~~~~~~~~~ ADD Handler ~~~~~~~~~~~~~~~~~
  async function handleAddMovie( id: number, title: string, year: number, country: string, director: string, duration: number) {
    const request = {
      Title: title,
      Year: year,
      Country: country,
      Director: director,
      Duration: duration,
    };

    Post(request, path);
  }

  // ~~~~~~~~~~~~~~~ DELETE Handler ~~~~~~~~~~~~~~~~~
  const handleDeleteMovie = (id: number) => async (e: React.MouseEvent) => {
    Delete(id, path);
  };

  // ~~~~~~~~~~~~~~~ EDIT Handler ~~~~~~~~~~~~~~~~~
  async function handleEditMovie(id: number, title: string, year: number, country: string, director: string, duration: number) {
    const request = {
      Title: title,
      Year: year,
      Country: country,
      Director: director,
      Duration: duration,
    };

    Put(id, request, path)
  }

  return (
    <div className="full-container">
      <h2 className="header">{name}</h2>

      <div className="toolButtons">
        <MovieModalForm
          type="new"
          clickHandler={handleAddMovie}
          titlePh="Insertar título"
          yearPh={new Date().getFullYear()}
          countryPh="Insertar país"
          directorPh="Insertar director"
          durationPh={0}
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
              <th>Título</th>
              <th>Año</th>
              <th>País</th>
              <th>Director</th>
              <th>Duración</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>{movie.country}</td>
                <td>{movie.director}</td>
                <td>{movie.duration} min</td>
                <td className="editColumn">
                  <div className="modifyButtons">
                    <MovieModalForm
                      type="edit"
                      clickHandler={handleEditMovie}
                      titlePh={movie.title}
                      yearPh={movie.year}
                      countryPh={movie.country}
                      directorPh={movie.director}
                      durationPh={movie.duration}
                      buttonConfig={{
                        className: "modifyButton",
                        color: "secondary",
                        content: <FiEdit2 />,
                      }}
                      modifyId={movie.id}
                    />

                    <button
                      className="btn btn-danger modifyButton"
                      onClick={handleDeleteMovie(movie.id)}
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

export default MovieManager;
