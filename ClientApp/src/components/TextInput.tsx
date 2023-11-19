import React, { useState } from "react";

interface Props{
    name: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
    defaultValue: string;
}

function TextInput(props: Props){
    const [invalidFeedback, setInvalidFeedback] = useState("");
    const [tag, setTag] = useState("");

    const handleChange = (e: React.ChangeEvent) => {
        const newValue = (e.target as HTMLInputElement).value;
        
        // Control invalid feedback
        if (newValue.length === 0) {
          setInvalidFeedback("Campo obligatorio");
          setTag("is-invalid");
        } else setTag("");
        
        props.setValue(newValue);
      };

    return(
        <div className="form-group formgroup">
            <label htmlFor="titleInput">{props.name}</label>
            <input type="text" className={`form-control ${tag}`} id="titleInput" placeholder={props.placeholder} defaultValue={props.defaultValue} onChange={handleChange}/>
            <div className="invalid-feedback">{invalidFeedback}</div>
        </div>
    );
}

export default TextInput