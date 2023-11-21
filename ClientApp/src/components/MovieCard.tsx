import React, { useEffect, useState } from "react";
import { Movie } from "../types/types";
import "./MovieCard.css";
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
import { useNavigate } from 'react-router-dom';

interface Props {
  movie: Movie;
  route: string;
  redirect: string;
}

function MovieCard(props: Props) {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  function handleCardClick(): React.MouseEventHandler<HTMLElement> | undefined {
    throw new Error("Function not implemented.");
  }

  function formatList(list: string[]): string {
    var result = '';
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      result += i===0 ? element : ' ● ' + element;
    }
    return result;
  }



  const handleResize = () => {
    if (window.innerWidth < 400) {
      setLayout('flex-column');
    } else {
      setLayout('flex-row');
    }
  };

  const [layout, setLayout] = useState('flex-row');

  useEffect(() => {
    // Configurar el diseño inicial en función del tamaño de la pantalla
    handleResize();

    // Agregar el evento de cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);





  function handleBuy(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    toggle();
    navigate(props.redirect);
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

      <Modal size="lg" isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}><FcInfo/> Información</ModalHeader>
        <ModalBody>
          <Card className={`d-flex ${layout}`}>
            <CardImg
              width={150}
              height={220}
              src={props.route}
              alt={props.movie.title}
              className="movie-img poster-card img-fluid w-100 h-100"
            />
            <CardBody>
              <CardTitle tag="h4">{props.movie.title}</CardTitle>

              <CardSubtitle className="mb-2 text-muted" tag="h5">
                {props.movie.year}
              </CardSubtitle>

              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {props.movie.country}
              </CardSubtitle>

              <hr />

              <CardSubtitle tag="h6">Géneros:</CardSubtitle>
              <CardText>
                {formatList(props.movie.genres.map(g => g.name))}
              </CardText>

              <CardSubtitle tag="h6">Protagonistas:</CardSubtitle>
              <CardText>
                {formatList(props.movie.actors.map(a => a.name))}
              </CardText>

              <CardSubtitle tag="h6">Dirección:</CardSubtitle>
              <CardText>
                {props.movie.director}
              </CardText>

              <CardSubtitle tag="h6">Duración:</CardSubtitle>
              <CardText>
                {props.movie.duration} minutos
              </CardText>
              
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleBuy}>
            Ver programaciones
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </li>
  );
}

export default MovieCard;
