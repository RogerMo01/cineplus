import React, { FormEvent, useState } from "react";
import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import Post from "./ProcessPost";

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

    const isLocalTesting = process.env.REACT_APP_LOCAL_TESTING;
    const port = process.env.REACT_APP_PORT;
    const networkIp = process.env.REACT_APP_NETWORK_IP;

    const home = (isLocalTesting === 'true') ? `https://localhost:${port}` : `https://${networkIp}:${port}`;
    const endpoint = '/api/authentication';

    Post(formData, home + endpoint);
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
        <NavLink className="text-primary" to="/sign-up">¿Ya estás registrado?</NavLink>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LogInForm;
