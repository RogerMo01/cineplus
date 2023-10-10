import React, { useState } from "react";

interface Props {
  id: string;
  placeholder: string;
  showHeader: boolean;
}

function PasswordInput(props: Props) {
  const [passw, setPassw] = useState("");

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    const count = value.length;
    if (count === 21) {
      (event.target as HTMLInputElement).value = passw;
    } else {
      setPassw(value);
    }
  };

  return (
    <>
      {props.showHeader && <label htmlFor={props.id}>Contraseña</label>}
      <input
        type="password"
        className="form-control"
        id={props.id}
        placeholder={props.placeholder}
        onInput={handleInputChange}
      />
      {props.showHeader && (
        <small id="passwordHelp" className="form-text text-muted">
          La contraseña debe tener entre 6-20 caracteres
        </small>
      )}
    </>
  );
}

export default PasswordInput;
