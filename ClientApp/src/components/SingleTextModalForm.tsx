import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./MovieModalForm.css";
import TextInput from "./TextInput";
import { BiErrorCircle } from "react-icons/bi";
import { ButtonConfig } from "../types/types";

interface Props {
  type: string; // {new, edit}
  clickHandler: (id: number, name: string) => void;
  namePh: string;
  buttonConfig: ButtonConfig;
  modifyId: number;
}


function SingleTextModalForm(props: Props) {
  const [show, setShow] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const [name, setName] = useState("");


  const toggle = () => {
    resetValues();
    setShow(!show);
  };
  function resetValues() {
    setName(props.type === "edit" ? props.namePh : "");
    setInvalidInput(false);
  }


  const validateInput = () => {
    if (name.length === 0) {
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
            ? "Nuevo"
            : props.type === "edit"
            ? "Editar"
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
                  name
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

export default SingleTextModalForm;
