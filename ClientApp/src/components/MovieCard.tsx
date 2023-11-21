import React, { useEffect, useState } from "react";
import { Movie } from "../types/types";
import "./MovieCard.css";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
} from "reactstrap";
import MovieInfoModal from "./MovieInfoModal";
// import { useNavigate } from 'react-router-dom';

interface Props {
  movie: Movie;
  route: string;
  redirect: string;
}

function MovieCard(props: Props) {
  // const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleResize = () => {
    if (window.innerWidth < 400) {
      setLayout('flex-column');
    } else {
      setLayout('flex-row');
    }
  };

  const [layout, setLayout] = useState('flex-row');

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);





  function handleBuy(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    toggle();
    // navigate(props.redirect);
  }

  return (
    <li className="movie-card d-flex justify-content-center">
      <Card className="tcard" onClick={toggle}>
        <CardImg
          width={150}
          height={220}
          src={props.route}
          alt={props.movie.title}
          className="movie-img"
        />
        <CardBody>
          <CardTitle tag="h5">{props.movie.title}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {props.movie.year}
          </CardSubtitle>
        </CardBody>
      </Card>

      <MovieInfoModal showModal={modal} toggle={toggle} layout={layout} movie={props.movie} route={props.route} redirect={props.redirect} handleBuy={handleBuy} />
      
    </li>
  );
}

export default MovieCard;
