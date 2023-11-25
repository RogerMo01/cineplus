import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ButtonConfig, SingleTextModal, Movie } from "../types/types";
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import fetchStats from "./FetchStats";
import es from "date-fns/locale/es";

interface Props {
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  actorsList: SingleTextModal[];
  genresList: SingleTextModal[];
  buttonConfig: ButtonConfig;
  statsEndpoint:string
}

function MovieFilterForm(props: Props) {
  const [show, setShow] = useState(false);
  const [selectedActor, setSelectedActor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedDateStart, setSelectedDateStart] = useState(new Date(1900));
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());

  const toggle = () => {
    setShow(!show);
  };

  const handleActorChange = (e: React.ChangeEvent) => {
    const newActor = (e.target as HTMLInputElement).value;
    setSelectedActor(newActor);
  };

  const handleGenreChange = (e: React.ChangeEvent) => {
    const newGenre = (e.target as HTMLInputElement).value;
    setSelectedGenre(newGenre);
  };

  const handleDateStartChange = (date: Date) => {
    setSelectedDateStart(date);
  };
  const handleDateEndChange = (date: Date) => {
    setSelectedDateEnd(date);
  };

  async function handleClick() {
    const request = {
      actor:selectedActor,
      genres:selectedGenre,
      begin:selectedDateStart,
      end:selectedDateEnd
    };

    fetchStats(props.statsEndpoint,props.setMovies,{params:request});
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
          Filtros
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group formgroup">
              <label>Actor</label>
              <Form.Select aria-label="Actor" onChange={handleActorChange} defaultValue={""}>
                {props.actorsList.map((y) => (
                  <option key={y.id} value={y.name}>
                    {y.name}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="form-group formgroup">
              <label>Género</label>
              <Form.Select aria-label="Género" onChange={handleGenreChange} defaultValue={""}>
                {props.genresList.map((y) => (
                  <option key={y.id} value={y.name}>
                    {y.name}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="row form-group formgroup">
              <div className='col'>
                <label>Desde</label>
                <div>
                  <DatePicker
                    // showIcon
                    selected={selectedDateStart}
                    showTimeInput
                    timeInputLabel="Hora:"
                    maxDate={selectedDateEnd}
                    onChange={handleDateStartChange}
                    locale={es}
                    dateFormat="yyyy MMMM d"
                  />
                </div>
              </div>
              <div className='col'>
                <label>Hasta</label>
                <div>
                  <DatePicker
                    // showIcon
                    selected={selectedDateEnd}
                    showTimeInput
                    timeInputLabel="Hora:"
                    minDate={selectedDateStart}
                    maxDate={new Date()}
                    onChange={handleDateEndChange}
                    locale={es}
                    dateFormat="yyyy MMMM d"
                  />
                </div>
              </div>
            </div>


          </form>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cerrar
          </Button>
          <Button
            className="align-right"
            color="primary"
            onClick={(e) => {
              handleClick();
              toggle();
            }}
          >
            Filtrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );

};

export default MovieFilterForm;