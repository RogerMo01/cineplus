import React from "react";
import { Movie }from "../types/types";
import "./TopicList.css";
import MovieCard from "./MovieCard";
// @ts-ignore
import img from '../media/default_poster.jpg'


interface Props {
  topic: string;
  movies: Movie[];
}

const TopicList = (props: Props) => {
  return (
    <div>
      <h4>{props.topic}:</h4>

      <ul className="ul-group">
        {props.movies.map(m => (
          <MovieCard key={m.id} movie={m} route={img} />
        ))}
      </ul>

    </div>
  );
};

export default TopicList;
