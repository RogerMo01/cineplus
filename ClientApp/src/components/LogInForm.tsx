import React, { FormEvent, useState } from "react";
import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import { ToastContainer, toast } from "react-toastify";
import axios, { AxiosError } from "axios";

function LogInForm() {
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
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (username.length === 0 || password.length === 0) {
      toast.error("Hay campos vacíos", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }
    if (password.length < 6 || password.length > 20) {
      toast.error("La contraseña debe tener al menos 6 caracteres", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = {
      Nick: username,
      Password: password,
    };

    try {
      const isLocalTesting = process.env.REACT_APP_LOCAL_TESTING;
      const port = process.env.REACT_APP_PORT;
      const networkIp = process.env.REACT_APP_NETWORK_IP;

      const home = (isLocalTesting === 'true') ? `https://localhost:${port}` : `https://${networkIp}:${port}`;
      //🚨🚨🚨Fix endpoints
      const endpoint = '/api/endpoint';
      
      const response = await axios.post(home + endpoint, formData);


      if (response.status === 200) {
        console.log("post success");
        toast.success("Sesión iniciada!", { position: "bottom-right", autoClose: 3000 });

        // 🚨🚨🚨🚨🚨 Redireccionar a algun sitio 🚨🚨🚨🚨🚨
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;

        if (axiosError.response) {
          const status = axiosError.response.status;
          const message = axiosError.response.data.message;

          if (status === 409) {
            console.log("Invalid credentials");
            toast.error(message, { position: "bottom-right", autoClose: 3000 });
          } else {
            toast.error(`Error en el registro (${status})`, { position: "bottom-right", autoClose: 3000 });
            console.error("Error al enviar la solicitud", axiosError);
          }
        } else {
          // Handle errors with no HTTP response
          console.error("Error al enviar la solicitud", error);
          toast.error(`Error en el registro (${error})`, { position: "bottom-right", autoClose: 3000 });
        }
      }
    }
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
          <button type="submit" className="btn btn-primary align-right">
            Iniciar sesión
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LogInForm;
