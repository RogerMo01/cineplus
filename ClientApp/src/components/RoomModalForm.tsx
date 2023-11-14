import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./MovieModalForm.css";
import TextInput from "./TextInput";
import { BiErrorCircle } from "react-icons/bi";
import { ButtonConfig } from "../types/types";

interface Props {
  type: string; // {new, edit}
  clickHandler: (id: number, name: string, seats: number) => void;
  namePh: string;
  seatsPh: number;
  buttonConfig: ButtonConfig;
  modifyId: number;
}


function RoomModalForm(props: Props) {
  const [show, setShow] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const [name, setName] = useState("");
  const [seats, setSeats] = useState(0);


  const toggle = () => {
    resetValues();
    setShow(!show);
  };
  function resetValues() {
    setName(props.type === "edit" ? props.namePh : "");
    setSeats(props.type === "edit" ? props.seatsPh : 0);
    setInvalidInput(false);
  }

  const handleSeatsChange = (e: React.ChangeEvent) => {
    const newCount = (e.target as HTMLInputElement).value;
    if(newCount === ''){
      setSeats(props.seatsPh);
    }
    else{
      setSeats(parseInt(newCount));
    }
  };

  const validateInput = () => {
    if (name.length === 0 || seats === 0 || seats < 0 || isNaN(seats)) {
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
            ? "Nueva Sala"
            : props.type === "edit"
            ? "Editar Sala"
            : ""}
        </ModalHeader>

        <ModalBody>
          <form>
            <TextInput
              name="Nombre"
              value={name}
              setValue={setName}
              placeholder={props.namePh}
              defaultValue={props.type === "edit" ? props.namePh : ""}
            />
            <div className="form-group formgroup">
              <label htmlFor="minutesInput">Cantidad de butacas</label>
              <input
                type="number"
                className="form-control"
                id="seatsCount"
                onChange={handleSeatsChange}
                placeholder={`${props.seatsPh}`}
                defaultValue={props.type === 'edit' ? props.seatsPh : undefined}
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
                  name,
                  seats
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

export default RoomModalForm;
