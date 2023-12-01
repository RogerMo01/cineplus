import React, { useState } from "react";

interface Props {
  dni: string;
  setDni: React.Dispatch<React.SetStateAction<string>>;
}

function DniInput({ dni, setDni }: Props) {
  const [tag, setTag] = useState("");
  const dniInvalidFeedback = "Campo obligatorio";



  const handleDniInputChange = (e: React.ChangeEvent) => {
    const newDni = (e.target as HTMLInputElement).value;

    if (newDni !== "" && (newDni.length > 11 || !/^\d+$/.test(newDni))) {
      (e.target as HTMLInputElement).value = dni;
      return;
    }
    if (newDni.length === 0) {
      setTag("is-invalid");
    } else {
      setTag("");
    }

    setDni(newDni);
  };

  return (
    <div className="form-group formgroup">
      <label>Documento de identidad</label>
      <input
        className={`form-control ${tag}`}
        placeholder="Ingrese el número de CI"
        onChange={handleDniInputChange}
      />
      <div className="invalid-feedback">{dniInvalidFeedback}</div>
    </div>
  );
}

export default DniInput;
