import React from "react";
import "./MovieManager.css";
import { Movie, SingleTextModal } from "../types/types";
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
  actors: SingleTextModal[];
  genres: SingleTextModal[];
  path: string;
  getActorsEndpoint: string;
}

function MovieManager({ name, movies, actors, genres, path, getActorsEndpoint }: Props) {

  // ~~~~~~~~~~~~~~~ ADD Handler ~~~~~~~~~~~~~~~~~
  async function handleAddMovie( id: number, title: string, year: number, country: string, director: string, actors: SingleTextModal[], genres: SingleTextModal[], duration: number) {
    const request = {
      Title: title,
      Year: year,
      Country: country,
      Director: director,
      Actors: actors.map(a => a.id),
      Genres: genres.map(g => g.id),
      Duration: duration,
    };

    Post(request, path);
  }

  // ~~~~~~~~~~~~~~~ DELETE Handler ~~~~~~~~~~~~~~~~~
  const handleDeleteMovie = (id: number) => async (e: React.MouseEvent) => {
    Delete(id, path);
  };

  // ~~~~~~~~~~~~~~~ EDIT Handler ~~~~~~~~~~~~~~~~~
  async function handleEditMovie(id: number, title: string, year: number, country: string, director: string, actors: SingleTextModal[], genres: SingleTextModal[], duration: number) {
    const request = {
      Title: title,
      Year: year,
      Country: country,
      Director: director,
      Actors: actors.map(a => a.id),
      Genres: genres.map(g => g.id),
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
          actorsList={actors}
          genresList={genres}
          clickHandler={handleAddMovie}
          titlePh="Insertar título"
          yearPh={new Date().getFullYear()}
          countryPh="Insertar país"
          directorPh="Insertar director"
          actorsPh={[]}
          genresPh={[]}
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
              <th>Actores</th>
              <th>Géneros</th>
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
                <td>{(movie.actors ? movie.actors.map(a => a.name) : []).map((n, i) => (
                  <React.Fragment key={i}>
                  {n}<br />
                  </React.Fragment>
                ))}</td>
                <td>{(movie.genres ? movie.genres.map(g => g.name) : []).map((n, i) => (
                  <React.Fragment key={i}>
                  {n}<br />
                  </React.Fragment>
                ))}</td>
                <td>{movie.duration} min</td>
                <td className="editColumn">
                  <div className="modifyButtons">
                    <MovieModalForm
                      type="edit"
                      actorsList={actors}
                      genresList={genres}
                      clickHandler={handleEditMovie}
                      titlePh={movie.title}
                      yearPh={movie.year}
                      countryPh={movie.country}
                      directorPh={movie.director}
                      actorsPh={movie.actors}
                      genresPh={movie.genres}
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
