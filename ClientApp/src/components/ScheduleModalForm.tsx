import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./MovieModalForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiErrorCircle } from "react-icons/bi";
import { ButtonConfig, Movie, Room } from "../types/types";
import es from "date-fns/locale/es";
import Form from 'react-bootstrap/Form';


interface Props {
  type: string;
  clickHandler: (id: string, movie: string, room: string, date: Date, price: number, points: number) => void;
  movies: Movie[];
  rooms: Room[];
  moviePh: string;
  datePh: Date;
  roomPh: string;
  pricePh: number;
  pointsPricePh: number;
  buttonConfig: ButtonConfig;
  modifyId: string;
}

function ScheduleModalForm(props: Props) {
  const [show, setShow] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const [movie, setMovie] = useState(props.moviePh);
  const [room, setRoom] = useState(props.roomPh);
  const [date, setDate] = useState(new Date());
  const [price, setPrice] = useState(0);
  const [pointsPrice, setPointsPrice] = useState(0);

  const toggle = () => {
    resetValues();
    setShow(!show);
  };

  function resetValues() {
    setMovie(props.moviePh);
    setRoom(props.roomPh);
    setDate(props.type === "edit" ? props.datePh : new Date());
    setPrice(props.type === "edit" ? props.pricePh : 0);
    setPointsPrice(props.type === "edit" ? props.pointsPricePh : 0);
    setInvalidInput(false);
  }

  const validateInput = () => {
    if (
      movie.length === 0 ||
      room.length === 0 ||
      price === 0 ||
      isNaN(price) ||
      pointsPrice === 0 ||
      isNaN(pointsPrice)
    ) {
      setInvalidInput(true);
      return false;
    } else {
      setInvalidInput(false);
      return true;
    }
  };


  const handlePriceChange = (e: React.ChangeEvent) => {
    const newPrice = (e.target as HTMLInputElement).value;
    setPrice(parseFloat(newPrice));
  };
  const handlePointsPriceChange = (e: React.ChangeEvent) => {
    const newPointsPrice = (e.target as HTMLInputElement).value;
    setPointsPrice(parseInt(newPointsPrice));
  };
  const handleDateChange = (date: Date) => {
    setDate(date);
  };
  const handleMovieChange = (e: React.ChangeEvent) => {
    const newMovie = (e.target as HTMLInputElement).value;
    setMovie(newMovie);
  }
  const handleRoomChange = (e: React.ChangeEvent) => {
    const newRoom = (e.target as HTMLInputElement).value;
    setRoom(newRoom);
  }

  return (
    <div>
      <div className="toolButtons">
        <Button
          className={props.buttonConfig.className}
          color={props.buttonConfig.color}
          onClick={toggle}
        >
          {props.buttonConfig.content}
        </Button>
      </div>

      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {props.type === "new"
            ? "Nueva Programación"
            : props.type === "edit"
            ? "Editar Programación"
            : ""}
        </ModalHeader>

        <ModalBody>
          <form>

            <div className="form-group formgroup">
                <label>Película</label>
                <Form.Select aria-label="Película" onChange={handleMovieChange} defaultValue={props.moviePh}>
                    {props.movies.map((m) => (
                      <option key={m.id} value={m.title}>
                        {m.title}
                      </option>
                    ))}
                </Form.Select>
            </div>

            <div className="form-group formgroup">
                <label>Sala</label>
                <Form.Select aria-label="Sala" onChange={handleRoomChange} defaultValue={props.roomPh}>
                    {props.rooms.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                </Form.Select>
            </div>


            <div className="form-group formgroup">
              <label>Horario</label>
              <div>
                  <DatePicker
                    // showIcon
                    selected={date}
                    showTimeInput
                    timeInputLabel="Hora:"
                    minDate={new Date()}
                    onChange={handleDateChange}
                    locale={es}
                    dateFormat="MMMM d, h:mm aa"
                  />
              </div>
            </div>


            <div className="form-group formgroup">
              <label htmlFor="priceInput">Precio ($)</label>
              <input
                type="number"
                className="form-control"
                id="priceInput"
                onChange={handlePriceChange}
                placeholder={`${props.pricePh}`}
                defaultValue={props.pricePh}
                step="1"
                min="1"
                required
              />
            </div>

            <div className="form-group formgroup">
              <label htmlFor="pointsPriceInput">Precio en Puntos</label>
              <input
                type="number"
                className="form-control"
                id="pointsPriceInput"
                onChange={handlePointsPriceChange}
                placeholder={`${props.pointsPricePh}`}
                defaultValue={props.pointsPricePh}
                step="1"
                min="1"
                required
              />
            </div>

          </form>

          {invalidInput && (
            <div className="alert alert-danger formgroup" role="alert">
              <BiErrorCircle /> Entradas inválidas
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cerrar
          </Button>
          <Button
            className="align-right"
            color="primary"
            onClick={(e) => {
              if (validateInput()) {
                props.clickHandler(
                    props.modifyId,
                    movie,
                    room,
                    date,
                    price,
                    pointsPrice
                );
                toggle();
              }
            }}
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ScheduleModalForm;
