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
  const [enable1,setEnable1] =useState(false); 
  const [enable2,setEnable2] =useState(false); 
  const [enable3,setEnable3] =useState(false); 
  const [selectedActor, setSelectedActor] = useState<SingleTextModal|string|null>(props.actorsList.length>0?props.actorsList[0]:null);
  const [selectedGenre, setSelectedGenre] = useState<SingleTextModal|string|null>(props.genresList.length>0?props.genresList[0]:null);
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
      actor:enable1?selectedActor:null,
      genres:enable2?selectedGenre:null,
      begin:enable3?selectedDateStart:null,
      end:enable3?selectedDateEnd:null
    };

    fetchStats(props.statsEndpoint,props.setMovies,{params:request});
  }

  function handleClickE1(){
    setEnable1(!enable1);
  }
  function handleClickE2(){
    setEnable2(!enable2);
  }
  function handleClickE3(){
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
        <ModalHeader toggle={toggle}>
          Filtros
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group formgroup">
              <label>Actor</label>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onClick={handleClickE1} checked={enable1}/>
              </div>
              {enable1 && <Form.Select aria-label="Actor" onChange={handleActorChange} defaultValue={""}>
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
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onClick={handleClickE2} checked={enable2}/>
              </div>
              {enable2&&<Form.Select aria-label="Género" onChange={handleGenreChange} defaultValue={""}>
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
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onClick={handleClickE3} checked={enable3}/>
              </div>
              {enable3&&<div className="row">
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