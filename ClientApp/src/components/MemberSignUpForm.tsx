import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import TextInput from "./TextInput";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import axios, { AxiosError } from "axios";
import DniInput from "./DniInput";
import fetch from "./Fetch";

interface Props {
  header: string;
  endpoint: string;
  setter?: React.Dispatch<React.SetStateAction<{member: boolean}>>;
  setterEndpoint?: string;
}

function MemberSignUpForm({ header, endpoint, setter, setterEndpoint }: Props) {
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");


  const [valid, setValid] = useState(true);
  const [show, setShow] = useState(false);
  const [code, setCode] = useState("");

  const toggle = () => setShow(!show);

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    if (!validateInputs()) return;

    const request = {
      fullName: name,
      DNI: dni,
    };

    axios
      .post(endpoint, request)
      .then((response) => {
        const code = response.data.code;
        console.log("El codigo es: " + code);
        setCode(code);
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
    if (dni.length !== 11 || name.length === 0) {
      setValid(false);
      return false;
    }
    setValid(true);
    return true;
  };

  function handleCloseCode(event: React.MouseEvent): void {
    toggle();
    setCode("");
    if(setter && setterEndpoint){
      fetch(setterEndpoint, setter);
    }
  }

  return (
    <div className="fullts-container border rounded">
      <h2 className="text-center form-element">{header}</h2>

      <div className="form-container border rounded custom-padding container">
        <form onSubmit={handleSubmit}>
          <TextInput
            name="Nombre completo"
            value={name}
            setValue={setName}
            placeholder="Ingrese el nombre completo"
            defaultValue=""
          />

          <DniInput dni={dni} setDni={setDni} />

          {!valid && (
            <Alert className="formgroup" color="danger">
              Entradas inválidas
            </Alert>
          )}

          <div className="d-flex justify-content-end">
            <Button type="submit" color="primary" className="formgroup">
              {header}
            </Button>
          </div>
        </form>
      </div>

      <Modal isOpen={show} toggle={toggle}>
        <ModalHeader>Código de Membresía</ModalHeader>
        <ModalBody>{`Conserve este código: ${code}`}</ModalBody>
        <ModalFooter>
          <Button onClick={handleCloseCode}>Cerrar</Button>
        </ModalFooter>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default MemberSignUpForm;
