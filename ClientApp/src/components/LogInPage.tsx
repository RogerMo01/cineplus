import React from "react";
import LogInForm from "./LogInForm";
import { Container } from "reactstrap";

function LogInPage({tokenSetter} : {tokenSetter: React.Dispatch<React.SetStateAction<string | null>>}) {
  
  return (
    <Container className="mt-5">
      <LogInForm tokenSetter={tokenSetter} />
    </Container>
  );
}

export default LogInPage;