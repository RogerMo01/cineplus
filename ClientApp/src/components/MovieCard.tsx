import React from "react";
import { Movie } from "../types/types";

import './MovieCard.css'


interface Props {
    movie: Movie,
    route: string,
}

function MovieCard(props: Props) {
    return(
        <li className="movie-card">
            <img src={props.route} width={110} height={170} className="movie-img" alt={props.movie.title} />
            <div>{props.movie.title}</div>
            <div>•{props.movie.year}•</div>
        </li>
    );
}

export default MovieCard;