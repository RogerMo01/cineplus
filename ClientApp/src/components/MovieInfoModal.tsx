import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { FcInfo } from "react-icons/fc";
import { Movie } from "../types/types";

interface Props {
  showModal: boolean;
  toggle: () => void;
  layout: string;
  movie: Movie;
  route: string;
  redirect: string;
  handleSeeSchedule: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function formatList(list: string[]): string {
  var result = "";
  for (let i = 0; i < list.length; i++) {
    const element = list[i];
    result += i === 0 ? element : " ● " + element;
  }
  return result;
}

function MovieInfoModal({
  showModal,
  toggle,
  layout,
  movie,
  route,
  redirect,
  handleSeeSchedule: handleBuy
}: Props) {
  
  return (

    <Modal size="lg" isOpen={showModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <FcInfo /> Información
      </ModalHeader>
      <ModalBody>
        <Card className={`d-flex ${layout}`}>
          <CardImg
            width={150}
            height={220}
            src={route}
            alt={movie.title}
            className="movie-img poster-card img-fluid w-100 h-100"
          />
          <CardBody>
            <CardTitle tag="h4">{movie.title}</CardTitle>

            <CardSubtitle className="mb-2 text-muted" tag="h5">
              {movie.year}
            </CardSubtitle>

            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {movie.country}
            </CardSubtitle>

            <hr />

            <CardSubtitle tag="h6">Géneros:</CardSubtitle>
            <CardText>{formatList(movie.genres.map((g) => g.name))}</CardText>

            <CardSubtitle tag="h6">Protagonistas:</CardSubtitle>
            <CardText>{formatList(movie.actors.map((a) => a.name))}</CardText>

            <CardSubtitle tag="h6">Dirección:</CardSubtitle>
            <CardText>{movie.director}</CardText>

            <CardSubtitle tag="h6">Duración:</CardSubtitle>
            <CardText>{movie.duration} minutos</CardText>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleBuy}>
          Ver programaciones
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>


  );
}

export default MovieInfoModal;
