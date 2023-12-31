import React, { FormEvent, useState } from "react";
import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import "./SignUpForm.css";
import { scrollToTop } from "../utils/scrollToTop";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { UserPayload } from "../types/types";

function LogInForm({tokenSetter: setToken}: {tokenSetter: React.Dispatch<React.SetStateAction<string | null>>}) {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameInvalidFeedback, setUsernameInvalidFeedback] = useState("");
  const [usernameTag, setUsernameTag] = useState("");

  const handleUsernameInputChange = (e: React.ChangeEvent) => {
    const newUsername = (e.target as HTMLInputElement).value;
    
    // Control invalid feedback
    if (newUsername.length === 0) {
      setUsernameInvalidFeedback("Campo obligatorio");
      setUsernameTag("is-invalid");
    } else setUsernameTag("");

    setUsername(newUsername);
  };
  const onPasswordChange = (value: string) => {
    setPassword(value);
  };


  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    if (username.length === 0 || password.length === 0) {
      toast.error("Hay campos vacíos", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setIsButtonDisabled(false);
      return;
    }
    if (password.length < 6 || password.length > 20) {
      toast.error("La contraseña debe tener al menos 6 caracteres", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setIsButtonDisabled(false);
      return;
    }

    const formData = {
      Nick: username,
      Password: password,
    };

    try {
      const endpoint = '/api/authentication';

      const response = await axios.post(endpoint, formData);
      if(response){
        console.log('Solicitud exitosa! (200)');
        toast.success("Solicitud exitosa!, redireccionando...", {
          position: "bottom-right",
          autoClose: 2000,
        });
        
        const token = response.data.token;
        localStorage.setItem('sessionToken', token);

        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          // Si no hay token, elimina el encabezado de autorización
          delete axios.defaults.headers.common['Authorization'];
        }
        
        console.log('Token JWT:', token);

        const decodedToken = jwtDecode<UserPayload>(token);
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        console.log('Rol del usuario:', role);

        
        setTimeout(() => {
          setToken(token);
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
  
        if (axiosError.response) {
          const status = axiosError.response.status;
          const message = axiosError.response.data.message;
  
          if (message) {
            console.log("Error " + status);
            toast.error(message, { position: "bottom-right", autoClose: 3000 });
          }
        }
      } else {
        console.error(`Error en la solicitud (${error})`);
        toast.error(`Error en la solicitud (${error})`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }
    setIsButtonDisabled(false);
  };

  return (
    <div>
      <div className="form-container border rounded custom-padding">
        <form onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>
          <div className="form-group form-element">
            <UsernameInput
              usernameTag={usernameTag}
              changeHandler={handleUsernameInputChange}
              invalidFeedback={usernameInvalidFeedback}
            />
          </div>
          <div className="form-element mb-2">
            <PasswordInput
              id="passInput"
              placeholder="Introduce tu contraseña"
              showHeader={true}
              showSmall={false}
              onPasswordChange={onPasswordChange}
            />
          </div>
          <button type="submit" disabled={isButtonDisabled} className="btn btn-primary align-right">
            Iniciar sesión
          </button>
        </form>
        <NavLink className="text-primary" onClick={scrollToTop} to="/sign-up">¿Ya estás registrado?</NavLink>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LogInForm;
