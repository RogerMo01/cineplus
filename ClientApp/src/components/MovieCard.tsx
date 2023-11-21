import React from "react";
import { Movie } from "../types/types";
import "./MovieCard.css";
import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from "reactstrap";

interface Props {
  movie: Movie;
  route: string;
}

function MovieCard(props: Props) {
  return (
    <li className="movie-card">
      <Card className="tcard">
        <CardImg width={150} height={220} src={props.route} alt={props.movie.title} className="movie-img" />
        <CardBody>
          <CardTitle tag="h5">
            {props.movie.title}
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {props.movie.year}
          </CardSubtitle>
        </CardBody>
      </Card>
    </li>
  );
}

export default MovieCard;
