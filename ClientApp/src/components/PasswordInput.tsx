import React, { useState } from "react";

interface Props {
  id: string;
  placeholder: string;
  showHeader: boolean;
  onPasswordChange: (value: string) => void;
}

function PasswordInput(props: Props) {
  const [passw, setPassw] = useState("");

  const [passwordInvalidFeedback, setPasswordInvalidFeedback] = useState("");
  const [passwordTag, setPasswordTag] = useState("");


  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    const count = value.length;

    // Control invalid feedback
    if (value.length === 0) {
      setPasswordInvalidFeedback("Campo obligatorio");
      setPasswordTag("is-invalid");
    } else {
      setPasswordTag("");
    }

    if (count === 21) {
      (event.target as HTMLInputElement).value = passw;
    } else {
      setPassw(value);
    }
    props.onPasswordChange(value);
  };

  return (
    <>
      {props.showHeader && <label htmlFor={props.id}>Contraseña</label>}
      <input
        type="password"
        className={`form-control ${passwordTag}`}
        id={props.id}
        placeholder={props.placeholder}
        onChange={handleInputChange}
      />
      <div className="invalid-feedback">{passwordInvalidFeedback}</div>
      {props.showHeader && (
        <small id="passwordHelp" className="form-text text-muted">
          La contraseña debe tener entre 6-20 caracteres
        </small>
      )}
    </>
  );
}

export default PasswordInput;
