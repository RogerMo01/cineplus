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

interface Props {
  header: string;
  endpoint: string;
}

function MemberSignUpForm({ header, endpoint }: Props) {
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const dniInvalidFeedback = "Campo obligatorio";
  const [dniTag, setDniTag] = useState("");


  const [valid, setValid] = useState(true);
  const [show, setShow] = useState(false);
  const [code, setCode] = useState("");

  const toggle = () => setShow(!show);

  const handleDniInputChange = (e: React.ChangeEvent) => {
    const newDni = (e.target as HTMLInputElement).value;
    
    if (newDni !== "" && (newDni.length > 11 || !/^\d+$/.test(newDni))) {
      (e.target as HTMLInputElement).value = dni;
      return;
    }
    if(newDni.length === 0){
      setDniTag("is-invalid");
    } else {setDniTag("");}

    setDni(newDni);
  };

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    if (!validateInputs()) return;

    const request = {
      fullName: name,
      DNI: dni,
    };
    console.log("fullName: " + name);
    console.log("dni: " + dni);

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

          <div className="form-group formgroup">
            <label>Documento de identidad</label>
            <input
              className={`form-control ${dniTag}`}
              placeholder="Ingrse el número de CI"
              onChange={handleDniInputChange}
            />
            <div className="invalid-feedback">{dniInvalidFeedback}</div>
          </div>

          {!valid && (
            <Alert className="formgroup" color="danger">
              Entradas inválidas
            </Alert>
          )}

          {/* {code.length > 0 && (
            <Alert className="formgroup" color="success">
              {`Código de miembro: ${code}`}
            </Alert>
          )} */}

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
