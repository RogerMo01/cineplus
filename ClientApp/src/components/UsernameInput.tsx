import React from "react";

interface Props{
    usernameTag : string,
    changeHandler : (e: React.ChangeEvent) => void,
    invalidFeedback : string
}

function UsernameInput(props: Props){


    return <>
        <label htmlFor="usernameInput">Nombre de Usuario</label>
            <input
              className={`form-control ${props.usernameTag}`}
              name="username"
              id="usernameInput"
              placeholder="Elige tu usuario"
              onChange={props.changeHandler}
            />
        <div className="invalid-feedback">{props.invalidFeedback}</div>
    </>
}

export default UsernameInput