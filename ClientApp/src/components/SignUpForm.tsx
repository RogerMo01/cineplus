import React from "react";
import PasswordInput from "./PasswordInput";
import "./SignUpForm.css";

function SignUpForm() {
  return (
    <div className="form-container border rounded custom-padding">
      <form>
        <h2>Sign Up</h2>
        <div className="form-group form-element">
          <label htmlFor="usernameInput">Username</label>
          <input
            className="form-control"
            id="usernameInput"
            placeholder="Choose username"
          />
        </div>
        <div className="form-element">
          <div className="mb-2">
            <PasswordInput id="passInput" placeholder="Choose your password" showHeader={true} />
            
          </div>
          <div>
            <PasswordInput id="passInput2" placeholder="Confirm your password" showHeader={false} />
          </div>
        </div>

        <div className="form-group form-element">
          <label htmlFor="idCard">Identification Card</label>
          <input
            className="form-control"
            id="idCard"
            placeholder="Enter your Identification Card number"
          />
        </div>

        <div className="form-group form-element">
          <label htmlFor="creditCardInput">Credit Card</label>
          <input
            className="form-control"
            id="creditCardInput"
            placeholder="Enter your credit card number"
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
