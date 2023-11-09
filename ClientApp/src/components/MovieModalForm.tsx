import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./MovieModalForm.css";
import TextInput from "./TextInput";
import { BiErrorCircle } from "react-icons/bi";
import { ButtonConfig } from "../types/types";

interface Props {
  type: string; // {new, edit}
  clickHandler: (
    id: number,
    title: string,
    year: number,
    country: string,
    director: string,
    duration: number
  ) => void;
  titlePh: string;
  yearPh: number;
  countryPh: string;
  directorPh: string;
  durationPh: number;
  buttonConfig: ButtonConfig;
  modifyId: number;
}


function MovieModalForm(props: Props) {
  const [show, setShow] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [country, setCountry] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    resetValues();
    setShow(!show);
  };
  function resetValues() {
    setTitle(props.type === "edit" ? props.titlePh : "");
    setCountry(props.type === "edit" ? props.countryPh : "");
    setDirector(props.type === "edit" ? props.directorPh : "");
    setDuration(props.type === "edit" ? props.durationPh : 0);
    setInvalidInput(false);
    setYear(props.yearPh);
  }

  function getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  }

  const handleYearChange = (e: React.ChangeEvent) => {
    const newYear = (e.target as HTMLInputElement).value;
    setYear(parseInt(newYear));
  };

  const handleDurationChange = (e: React.ChangeEvent) => {
    const newDuration = (e.target as HTMLInputElement).value;
    setDuration(parseInt(newDuration));
  };

  const validateInput = () => {
    if (
      title.length === 0 ||
      country.length === 0 ||
      director.length === 0 ||
      duration === 0 ||
      isNaN(duration)
    ) {
      setInvalidInput(true);
      return false;
    } else {
      setInvalidInput(false);
      return true;
    }
  };

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
            ? "Nueva Película"
            : props.type === "edit"
            ? "Editar Película"
            : ""}
        </ModalHeader>

        <ModalBody>
          <form>
            <TextInput
              name="Título"
              value={title}
              setValue={setTitle}
              placeholder={props.titlePh}
              defaultValue={props.type === "edit" ? props.titlePh : ""}
            />

            <div className="form-group formgroup">
              <label htmlFor="year">Año:</label>
              <select
                id="year"
                name="year"
                className="select"
                onChange={handleYearChange}
                defaultValue={props.yearPh}
              >
                {getYears().map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <TextInput
              name="País"
              value={country}
              setValue={setCountry}
              placeholder={props.countryPh}
              defaultValue={props.type === "edit" ? props.countryPh : ""}
            />

            <TextInput
              name="Director"
              value={director}
              setValue={setDirector}
              placeholder={props.directorPh}
              defaultValue={props.type === "edit" ? props.directorPh : ""}
            />

            <div className="form-group formgroup">
              <label htmlFor="minutesInput">Duración (minutos)</label>
              <input
                type="number"
                className="form-control"
                id="minutesInput"
                onChange={handleDurationChange}
                placeholder={`${props.durationPh}`}
                defaultValue={props.durationPh}
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
                  title,
                  year,
                  country,
                  director,
                  duration
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

export default MovieModalForm;