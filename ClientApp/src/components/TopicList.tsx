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
  likeEndpoint: string;
  changeKey: string;
}

const TopicList = (props: Props) => {
  return (
    <div>
      <ul className="ul-group">
        {props.movies.map(m => (
          <MovieCard key={m.id} movie={m} likeEndpoint={props.likeEndpoint} route={`posters/${m.title}.jpg`} redirect='/log-in' scheduleEndpoint={props.scheduleEndpoint} modalContent={props.modalContent} tokenSetter={props.tokenSetter} changeKey={props.changeKey} />
        ))}
      </ul>
    </div>
  );
};



export default TopicList;
