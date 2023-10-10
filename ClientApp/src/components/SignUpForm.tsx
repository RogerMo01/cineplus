import React from "react";
import PasswordInput from "./PasswordInput";
import "./SignUpForm.css";

function SignUpForm() {
  return (
    <div className="form-container border rounded custom-padding">
      <form>
        <h2>Registrarse</h2>
        <div className="form-group form-element">
          <label htmlFor="usernameInput">Nombre de Usuario</label>
          <input
            className="form-control"
            id="usernameInput"
            placeholder="Elige tu usuario"
          />
        </div>
        <div className="form-element">
          <div className="mb-2">
            <PasswordInput id="passInput" placeholder="Elige tu contraseña" showHeader={true} />
          </div>
          <div>
            <PasswordInput id="passInput2" placeholder="Confirma tu contraseña" showHeader={false} />
          </div>
        </div>

        <div className="form-group form-element">
          <label htmlFor="idCard">DNI</label>
          <input
            className="form-control"
            id="idCard"
            placeholder="Introduce tu DNI"
          />
        </div>

        <div className="form-group form-element">
          <label htmlFor="creditCardInput">Tarjeta de crédito</label>
          <input
            className="form-control"
            id="creditCardInput"
            placeholder="Introduce tu número de tarjeta"
          />
        </div>

        <button type="submit" className="btn btn-primary align-right">
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
