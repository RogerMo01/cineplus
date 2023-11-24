import React from "react";
import { Movie }from "../types/types";
import "./TopicList.css";
import MovieCard from "./MovieCard";


interface Props {
  topic: string;
  movies: Movie[];
  scheduleEndpoint: string;
  modalContent?: React.ComponentType<any>;
}

const TopicList = (props: Props) => {
  return (
    <div>
      <ul className="ul-group">
        {props.movies.map(m => (
          <MovieCard key={m.id} movie={m} route={`${m.id}.jpg`} redirect='/log-in' scheduleEndpoint={props.scheduleEndpoint} modalContent={props.modalContent} />
        ))}
      </ul>

    </div>
  );
};



export default TopicList;
