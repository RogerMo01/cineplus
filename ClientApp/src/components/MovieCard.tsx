import React, { useEffect, useState } from "react";
import { Movie, MovieSchedule } from "../types/types";
import "./MovieCard.css";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import MovieInfoModal from "./MovieInfoModal";
import MoviesScheduledList from "./MovieScheduledList";
import fetch from "./Fetch";

interface Props {
  movie: Movie;
  route: string;
  redirect: string;
  scheduleEndpoint: string;
  modalContent?: React.ComponentType<any>;
}

function MovieCard(props: Props) {

  const [modal, setModal] = useState(false);
  const [scheduledModal, setScheduledModal] = useState(false);
  const [redirectModal, setRedirectModal] = useState(false);
  const [schedule, setSchedule] = useState<MovieSchedule[]>([]);

  const toggle = () => setModal(!modal);
  const toggle2 = () => setScheduledModal(!scheduledModal); 
  const toggle3 = () => setRedirectModal(!redirectModal); 

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(props.scheduleEndpoint, setSchedule);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduledModal, redirectModal]);



  function handleSeeSchedule(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    toggle();
    toggle2();
  }

  function handleBuy(scheduledMovieId: string, scheduledRoom: string, scheduledDate: Date): void {
    console.log("Comprando programacion con ID:", scheduledMovieId);
    setSelectedScheduledMovie(scheduledMovieId);
    setSelectedScheduledRoom(scheduledRoom);
    setSelectedScheduledDate(scheduledDate);

    toggle3();
  }

  const [selectedScheduledMovie, setSelectedScheduledMovie]= useState('');
  const [selectedScheduledRoom, setSelectedScheduledRoom]= useState('');
  const [selectedScheduledDate, setSelectedScheduledDate]= useState(new Date());

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

      <MovieInfoModal showModal={modal} toggle={toggle} layout={layout} movie={props.movie} route={props.route} redirect={props.redirect} handleSeeSchedule={handleSeeSchedule} />
      
      <MoviesScheduledList name={props.movie.title} schedule={schedule} /*scheduleEndpoint={props.scheduleEndpoint}*/ showModal={scheduledModal} toggle={toggle2} handleBuy={handleBuy} movieId={props.movie.id} />

      <Modal size="lg" isOpen={redirectModal} toggle={toggle3}>
        <ModalHeader toggle={toggle3}>
        </ModalHeader>
        <ModalBody>
          {props.modalContent && React.createElement(props.modalContent, 
            {
              scheduledMovieId: selectedScheduledMovie,
              scheduledMovie: props.movie.title,
              scheduledRoom: selectedScheduledRoom,
              scheduledDate: selectedScheduledDate
            })}
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle3}>Cerrar</Button>
        </ModalFooter>
      </Modal>
      
    </li>
  );
}

export default MovieCard;
