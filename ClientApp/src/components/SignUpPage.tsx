import React from "react";
import SignUpForm from "./SignUpForm";
import { Container } from "reactstrap";

function SignUpPage() {
  const endpoint = '/api/registration';

  return (
    <Container>
      <SignUpForm endpoint={endpoint} />
    </Container>
  );
}

export default SignUpPage;