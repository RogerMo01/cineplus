import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./MovieModalForm.css";
import TextInput from "./TextInput";
import { BiErrorCircle } from "react-icons/bi";
import { ButtonConfig } from "../types/types";

interface Props {
  type: string; // {new, edit}
  clickHandler: (id: number, concept: string, percent: number) => void;
  conceptPh: string;
  percentPh: number;
  buttonConfig: ButtonConfig;
  modifyId: number;
}
const regex = /[^0-9]/;


function DiscountModalForm(props: Props) {
  const [show, setShow] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);

  const [concept, setConcept] = useState("");
  const [percent, setPercent] = useState(0);

  const toggle = () => {
    resetValues();
    setShow(!show);
  };
  function resetValues() {
    setConcept(props.type === "edit" ? props.conceptPh : "");
    setPercent(props.type === "edit" ? props.percentPh : 0);
    setInvalidInput(false);
  }

  const handlePercentChange = (e: React.ChangeEvent) => {
    const newP = (e.target as HTMLInputElement).value;
    const val = parseInt(newP);
    

    
    if(regex.test(newP)){
        (e.target as HTMLInputElement).value = percent.toString();
    }
    else if(val > 100){
        (e.target as HTMLInputElement).value = "100";
    } 
    else if(val < 0){
        (e.target as HTMLInputElement).value = "0";
    }
    else if(newP === ''){
        setPercent(props.percentPh);
    }
    else{
        setPercent(parseInt(newP)/100);
    }
    
  };

  const validateInput = () => {
    if (
      concept.length === 0 ||
      isNaN(percent)
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
            ? "Nuevo Descuento"
            : props.type === "edit"
            ? "Editar Descuento"
            : ""}
        </ModalHeader>
        <ModalBody>
          <form>
            {props.type === "new" && <TextInput
              name="Concepto"
              value={concept}
              setValue={setConcept}
              placeholder={props.conceptPh}
              defaultValue={""}
            />}

            <div className="form-group formgroup">
              <label htmlFor="percentInput">Descuento(%)</label>
              <input
                type="number"
                className="form-control"
                id="percentInput"
                onChange={handlePercentChange}
                placeholder={`${props.percentPh * 100}`}
                defaultValue={props.type === 'edit' ? props.percentPh*100 : undefined}
                step="1"
                min="0"
                max="100"
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
                  concept,
                  percent
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

export default DiscountModalForm;
