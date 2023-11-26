import React from "react";
import { Movie }from "../types/types";
import "./TopicList.css";
import MovieCard from "./MovieCard";


interface Props {
  topic: string;
  movies: Movie[];
  scheduleEndpoint: string;
  modalContent?: React.ComponentType<any>;
  tokenSetter?: React.Dispatch<React.SetStateAction<string | null>>;
}

const TopicList = (props: Props) => {
  return (
    <div>
      <ul className="ul-group">
        {props.movies.map(m => (
          <MovieCard key={m.id} movie={m} route={`posters/${m.title}.jpg`} redirect='/log-in' scheduleEndpoint={props.scheduleEndpoint} modalContent={props.modalContent} tokenSetter={props.tokenSetter} />
        ))}
      </ul>
    </div>
  );
};



export default TopicList;
