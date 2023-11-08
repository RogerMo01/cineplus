import React from "react";
import "./MovieManager.css";
import { Movie } from "../types/types";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import NewMovieModalForm from "./MovieModalForm";

interface Props {
  name: string;
  movies: Movie[];
  deletePath: string;
  addPath: string;
  editPath: string;
}

function MovieManager({ name, movies, deletePath, addPath, editPath }: Props) {

  // ~~~~~~~~~~~~~~~ ADD Handler ~~~~~~~~~~~~~~~~~
  async function handleAddMovie(
    id: number,
    title: string,
    year: number,
    country: string,
    director: string,
    duration: number
  ) {
    alert("Try to add new movie: " + title);

    const request = {
      Title: title,
      Year: year,
      Country: country,
      Director: director,
      Duration: duration,
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

  // ~~~~~~~~~~~~~~~ DELETE Handler ~~~~~~~~~~~~~~~~~
  const handleDeleteMovie = (id: number) => async (e: React.MouseEvent) => {
    alert("Try to delete movie with id=" + id);

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

  // ~~~~~~~~~~~~~~~ EDIT Handler ~~~~~~~~~~~~~~~~~
  async function handleEditMovie(
    id: number,
    title: string,
    year: number,
    country: string,
    director: string,
    duration: number
  ) {
    alert("Try to edit movie: " + title);

    const request = {
      Title: title,
      Year: year,
      Country: country,
      Director: director,
      Duration: duration,
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
        <NewMovieModalForm
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
              <th>Id</th>
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
                <td>{movie.id}</td>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>{movie.country}</td>
                <td>{movie.director}</td>
                <td>{movie.duration} min</td>
                <td className="editColumn">
                  <div className="modifyButtons">
                    {/* <button className="btn btn-secondary modifyButton" onClick={handleEditMovie(movie.id, movie.title, movie.year, movie.country, movie.director, movie.duration)}>
                      <FiEdit2 />
                    </button> */}
                    {/* <NewMovieModalForm clickHandler={handleAddMovie} titlePh="Insertar título" yearPh={0} countryPh="Insertar país" directorPh="Insertar director" durationPh={0} buttonConfig={{className: "align-right", color: "primary", content: <>Nueva</>}} /> */}
                    <NewMovieModalForm
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
    </div>
  );
}

export default MovieManager;
