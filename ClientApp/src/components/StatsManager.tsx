import React, { useState, useEffect } from "react";
import "./MovieManager.css";
import { Movie, SingleTextModal } from "../types/types";
import MovieFilterForm from "./MovieFilterForm";
import fetch from "./Fetch";

interface Props {
    moviesEndpoint: string;
    actorsEndpoint: string;
    genresEndpoint: string;
    statsEndpoint: string;
}

function StatsManager({moviesEndpoint, actorsEndpoint, genresEndpoint, statsEndpoint}: Props) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [actors, setActors] = useState<SingleTextModal[]>([]);
    const [genres, setGenres] = useState<SingleTextModal[]>([]);

    useEffect(() => {
        fetch(actorsEndpoint, setActors);
        fetch(genresEndpoint, setGenres);
        fetch(statsEndpoint, setMovies);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="full-container">
            <h2 className="header">Películas Taquilleras</h2>
            <div className="toolButtons">
                <MovieFilterForm
                    setMovies={setMovies}
                    actorsList={actors}
                    genresList={genres}
                    buttonConfig={{
                        className: "align-right",
                        color: "primary",
                        content: <>Filtro</>,
                    }}
                    statsEndpoint={statsEndpoint}
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StatsManager;
