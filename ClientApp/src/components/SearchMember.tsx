import React, { useState } from "react";
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import DniInput from "./DniInput";
import './SearchMember.css'
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

interface Props {
  endpoint: string;
}



function SearchMember({endpoint} : Props) {
  const [dni, setDni] = useState('');
  const [valid, setValid] = useState(true);
  const [show, setShow] = useState(false);
  const [code, setCode] = useState('');
  const [points, setPoints] = useState('');
  const [name, setName] = useState('');

  const toggle = () => setShow(!show);



  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if(!validateInputs()) return;

    axios
      .get(`${endpoint}/dni/${dni}`)
      .then((response) => {
        const codeS = response.data.code;
        const pointsS = response.data.points;
        const nameS = response.data.name;
        setCode(codeS);
        setPoints(pointsS);
        setName(nameS);
        toggle();
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<any>;

          if (axiosError.response) {
            const status = axiosError.response.status;
            const message = axiosError.response.data.message;

            if (message) {
              console.log("Error " + status);
              toast.error(message, {
                position: "bottom-right",
                autoClose: 3000,
              });
            }
          }
        } else {
          console.error(`Error en la solicitud (${error})`);
          toast.error(`Error en la solicitud (${error})`, {
            position: "bottom-right",
            autoClose: 3000,
          });
        }
      });


  }

  const validateInputs = () => {
    if (dni.length !== 11) {
      setValid(false);
      return false;
    }
    else{
      setValid(true);
      return true;
    }
  };


  return (
    <div className="fullts-container border rounded search-member d-flex flex-column align-items-center">
      <h2 className="text-center form-element">Buscar Miembros</h2>
      <img
        className="img-fluid"
        width={300}
        height={60}
        src="club_diamond.png"
        alt="club_diamond"
      />

      <div className="form-container rounded custom-padding container">
        <form onSubmit={handleSubmit} className="">
          
          <DniInput dni={dni} setDni={setDni} />

          {!valid && (
            <Alert className="formgroup" color="danger">
              Entradas inválidas
            </Alert>
          )}

          <div className="d-flex justify-content-end">
            <Button type="submit" color="primary" className="formgroup">
              Buscar
            </Button>
          </div>
        </form>
      </div>

      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader>Código de Membresía</ModalHeader>
        <ModalBody>
          {`Nombre: ${name}`}<br />
          {`Código de Miembro: ${code}`}<br/>
          {`Puntos disponibles: ${points}`}
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Cerrar</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default SearchMember;
