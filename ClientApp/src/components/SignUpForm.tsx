import React, { FormEvent, useState } from "react";
import PasswordInput from "./PasswordInput";
import UsernameInput from "./UsernameInput";
import "./SignUpForm.css";
import { ToastContainer } from 'react-toastify';
import Post from "./ProcessPost";

function SignUpForm() {
  // ~~~~~~~~~~~~~ Main states ~~~~~~~~~~~~~~~~
  const [username, setUsername] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordConfirmValue, setPasswordConfirmValue] = useState("");
  const [dni, setDni] = useState("");
  const [creditCard, setCreditCard] = useState("");

  // ~~~~~~~~~~~~ END Main states ~~~~~~~~~~~~~

  // ~~~~~~~~~~~ Feedback states ~~~~~~~~~~~~~
  const [usernameInvalidFeedback, setUsernameInvalidFeedback] = useState("");
  const [usernameTag, setUsernameTag] = useState("");

  const [isInvalidPasswordFeedback, setIsInvalidPasswordFeedback] = useState(false);
  const [invalidPasswordFeedback, setInvalidPasswordFeedback] = useState("");

  const [dniInvalidFeedback, setDniInvalidFeedback] = useState("");
  const [dniTag, setDniTag] = useState("");

  const [creditCardInvalidFeedback, setCreditCardInvalidFeedback] = useState("");
  const [creditCardTag, setCreditCardTag] = useState("");
  // ~~~~~~~~~~ END Feedback states ~~~~~~~~~~~~

  

  // ~~~~~~~~~~~~~~~~~~~~~~~~ Input Handlers ~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleUsernameInputChange = (e: React.ChangeEvent) => {
    const newUsername = (e.target as HTMLInputElement).value;

    // Control invalid feedback
    if (newUsername.length === 0) {
      setUsernameInvalidFeedback("Campo obligatorio");
      setUsernameTag("is-invalid");
    } else setUsernameTag("");

    setUsername(newUsername);
  };
  const handleDniInputChange = (e: React.ChangeEvent) => {
    const newDni = (e.target as HTMLInputElement).value;

    // Control invalid feedback
    if (newDni.length === 0) {
      setDniInvalidFeedback("Campo obligatorio");
      setDniTag("is-invalid");
    } else setDniTag("");

    setDni(newDni);
  };
  const handleCreditCardChange = (e: React.ChangeEvent) => {
    const newCreditCard = (e.target as HTMLInputElement).value;

    // Control invalid feedback
    if (newCreditCard.length === 0) {
      setCreditCardInvalidFeedback("Campo obligatorio");
      setCreditCardTag("is-invalid");
    } else setCreditCardTag("");

    setCreditCard(newCreditCard);
  };
  const onPasswordChange = (value: string) => {
    setPasswordValue(value);
    setIsInvalidPasswordFeedback(false);
  };
  const onConfirmPasswordChange = (value: string) => {
    setPasswordConfirmValue(value);
    setIsInvalidPasswordFeedback(false);
  };
  // ~~~~~~~~~~~~~~~~~~~~~~~ END Input Handlers ~~~~~~~~~~~~~~~~~~~~~~~~


  // ~~~~~~~~~~~~~~~~~~~~~~~~ Submmit Handler ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // ~~~~~~ Validate data ~~~~~~~
    if (username.length > 20 || username.length < 6) {
      setUsernameInvalidFeedback(
        username.length === 0
          ? "Campo obligatorio"
          : "El nombre de usuario debe tener entre 6 y 20 caracteres"
      );
      setUsernameTag("is-invalid");
    } else if (passwordValue !== passwordConfirmValue) {
      setIsInvalidPasswordFeedback(true);
      setInvalidPasswordFeedback("No coinciden las contraseñas");
    } else if (passwordValue.length < 6) {
      setIsInvalidPasswordFeedback(true);
      setInvalidPasswordFeedback(
        "La contraseña debe tener al menos 6 caracteres"
      );
    } else if (Array.from(dni).some((caracter) => isNaN(Number(caracter)))) {
      setDniInvalidFeedback("Tu número de DNI tiene caracteres inválidos");
      setDniTag("is-invalid");
    } else if (dni.length !== 11) {
      setDniInvalidFeedback(
        dni.length === 0 ? "Campo obligatorio" : "El DNI debe tener 11 números"
      );
      setDniTag("is-invalid");
    } else if (creditCard.length !== 16) {
      setCreditCardInvalidFeedback(
        creditCard.length === 0
          ? "Campo obligatorio"
          : "Tarjeta de crédito inválida"
      );
      setCreditCardTag("is-invalid");
    } // ~~~~~~ END Validate data ~~~~~~~
    else {
      
      // ~~~~~~~~~ Handle valid submit ~~~~~~~~
      const formData = {
        Password: passwordValue,
        Nick: username,
        CreditCard: creditCard,
        DNI: dni,
      }

      const isLocalTesting = process.env.REACT_APP_LOCAL_TESTING;
      const port = process.env.REACT_APP_PORT;
      const networkIp = process.env.REACT_APP_NETWORK_IP;
      
      const home = (isLocalTesting === 'true') ? `https://localhost:${port}` : `https://${networkIp}:${port}`;
      const endpoint = '/api/registration';

      Post(formData, home + endpoint);
      
      // setTimeout(() => {
      //   window.location.href = home + '/log-in';
      // }, 2000);
    }

  };
  // ~~~~~~~~~~~~~~~ END Submmit Handler ~~~~~~~~~~~~~~~~~~
  




  return (
    <div>
      <div className="form-container border rounded custom-padding mt-5">
        <form onSubmit={handleSubmit}>
          <h2>Registrarse</h2>
          <div className="form-group form-element">
            <UsernameInput usernameTag={usernameTag} changeHandler={handleUsernameInputChange} invalidFeedback={usernameInvalidFeedback}/>
          </div>
          <div className="form-element">
            <div className="mb-2">
              <PasswordInput
                id="passInput"
                placeholder="Elige tu contraseña"
                showHeader={true}
                showSmall={true}
                onPasswordChange={onPasswordChange}
              />
            </div>
            <div>
              <PasswordInput
                id="passInput2"
                placeholder="Confirma tu contraseña"
                showHeader={false}
                showSmall={false}
                onPasswordChange={onConfirmPasswordChange}
              />
            </div>
          </div>
          <div className="form-group form-element">
            <label htmlFor="idCard">Documento de identidad</label>
            <input
              className={`form-control ${dniTag}`}
              id="idCard"
              placeholder="Introduce tu Documento de identidad"
              onChange={handleDniInputChange}
            />
            <div className="invalid-feedback">{dniInvalidFeedback}</div>
          </div>
          <div className="form-group form-element">
            <label htmlFor="creditCardInput">Tarjeta de crédito</label>
            <input
              className={`form-control ${creditCardTag}`}
              id="creditCardInput"
              placeholder="Introduce tu número de tarjeta"
              onChange={handleCreditCardChange}
            />
            <div className="invalid-feedback">{creditCardInvalidFeedback}</div>
          </div>
          <div className="form-group form-element">
            {isInvalidPasswordFeedback && (
              <label className="text-danger">
                {"*" + invalidPasswordFeedback}
              </label>
            )}
          </div>
          <button type="submit" className="btn btn-primary align-right">
            Registrarse
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUpForm;