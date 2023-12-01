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
  statsEndpoint: string
}

function MovieFilterForm(props: Props) {
  const [show, setShow] = useState(false);
  const [enable1, setEnable1] = useState(false);
  const [enable2, setEnable2] = useState(false);
  const [enable3, setEnable3] = useState(false);
  const [selectedActor, setSelectedActor] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedDateStart, setSelectedDateStart] = useState<Date | null>(new Date('1900'));
  const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(new Date());

  const toggle = () => {
    setShow(!show);
    setEnable1(false)
    setEnable2(false)
    setEnable3(false)

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
    if (date) {
      setSelectedDateStart(date);
    }
    else setSelectedDateStart(new Date(1900))
  };
  const handleDateEndChange = (date: Date) => {
    if (date) {
      setSelectedDateEnd(date);
    }
    else setSelectedDateEnd(new Date())
  };

  async function handleClick() {
    const request = {
      actor: enable1 ? (!selectedActor ? props.actorsList[0] : selectedActor) : null,
      genres: enable2 ? (!selectedGenre ? props.genresList[0] : selectedGenre) : null,
      begin: enable3 ? selectedDateStart : null,
      end: enable3 ? selectedDateEnd : null
    };

    console.log(selectedDateStart)
    console.log(selectedDateEnd)

    fetchStats(props.statsEndpoint, props.setMovies, { params: request });
  }

  function handleClickE1() {
    setEnable1(!enable1);
    setSelectedActor(props.actorsList[0].name)
  }
  function handleClickE2() {
    setEnable2(!enable2);
    setSelectedGenre(props.genresList[0].name)
  }
  function handleClickE3() {
    setEnable3(!enable3);
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
        <ModalHeader>
          Filtros
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group formgroup">
              <label>Actor</label>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onClick={handleClickE1} checked={enable1} />
              </div>
              {enable1 && <Form.Select aria-label="Actor" onChange={handleActorChange} defaultValue="">
                {props.actorsList.map((y) => (
                  <option key={y.id} value={y.name}>
                    {y.name}
                  </option>
                ))}
              </Form.Select>}
            </div>

            <div className="form-group formgroup">
              <label>Género</label>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onClick={handleClickE2} checked={enable2} />
              </div>
              {enable2 && <Form.Select aria-label="Género" onChange={handleGenreChange} defaultValue="">
                {props.genresList.map((y) => (
                  <option key={y.id} value={y.name}>
                    {y.name}
                  </option>
                ))}
              </Form.Select>}
            </div>
            <div className='form-group formgroup'>
              <label>Rango de Fecha</label>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onClick={handleClickE3} checked={enable3} />
              </div>
              {enable3 && <div className="row">
                <div className='col'>
                  <label>Desde</label>
                  <div>
                    <DatePicker
                      // showIcon
                      selected={selectedDateStart}
                      showTimeInput
                      timeInputLabel="Hora:"
                      maxDate={selectedDateEnd ? selectedDateEnd : new Date()}
                      onChange={handleDateStartChange}
                      locale={es}
                      dateFormat="yyyy MMMM d"
                      placeholderText='1899 diciembre 31'
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
                      placeholderText={"Hoy"}
                    />
                  </div>
                </div>
              </div>}
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