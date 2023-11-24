import React from "react";
import LogInForm from "./LogInForm";
import { Container } from "reactstrap";

function LogInPage() {
  const endpoint = '/api/authentication';
  
  return (
    <Container className="mt-5">
      <LogInForm endpoint={endpoint} />
    </Container>
  );
}

export default LogInPage;