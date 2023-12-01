import React, { useEffect, useState } from "react";
import { Alert, Input, Spinner } from "reactstrap";
import fetch from "../utils/Fetch";
import { AxiosError } from "axios";

interface Props {
    setDisabledButton: React.Dispatch<React.SetStateAction<boolean>>;
    pointsEndpoint: string;
    pointsPrice: number;
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
    pointsPaymentSetter: React.Dispatch<React.SetStateAction<boolean>>;
    pointsPayment: boolean;
    pointsRefresh: boolean;
}

function MemberCodeInput({setDisabledButton, pointsEndpoint, pointsPrice, code, setCode, pointsPaymentSetter, pointsPayment, pointsRefresh} : Props) {
  const [searching, setSearching] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  const [points, setPoints] = useState<{points: number}>({points: 0});
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);


  useEffect(() => {
    console.log(points);
    
    if(code.length === 8){
        setShowPoints(false);
        setError(false);
        setSearching(true);
        setDisabledButton(true);
        Promise.all([
            fetch(pointsEndpoint + `/points/${code}`, setPoints)
        ])
        .then(() => {
            setDisabledButton(false);
            setSearching(false);
            setShowPoints(true);

            if(pointsPayment && pointsPrice > points.points){
              setDisabledButton(true);
            }
        })
        .catch((e) => {
            setSearching(false);
            setErrorMessage((e as AxiosError<any>).response?.data.message);
            setError(true);
        })
    }
    else{
        setSearching(false);
        setDisabledButton(false);
        setShowPoints(false);
        setError(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, pointsPrice, pointsPayment, pointsRefresh])

  useEffect(() =>{
    fetch(pointsEndpoint + `/points/${code}`, setPoints);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointsRefresh])

  useEffect(() => {
    if(pointsPayment && code.length === 8){
      if(pointsPrice <= points.points){
        setDisabledButton(false);
      }
      else{
        setDisabledButton(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points])

  function normalize(inputString: string) {
    const cleanedString = inputString.replace(/[^a-zA-Z0-9]/g, "");
    return cleanedString.toUpperCase();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const newCode = event.target.value;
    if(newCode.length > 8){
        event.target.value = code;
        return;
    }
    const normalizedCode = normalize(newCode);
    event.target.value = normalizedCode;
    setCode(normalizedCode);
  }

  function handleSwitch(event: React.MouseEvent): void {
    pointsPaymentSetter(!pointsPayment);
  }

  return (
    <div>
        <div className="">
          <Input onChange={handleChange} placeholder="XXXXXXXX" type="text"></Input>
          <div className="form-check form-switch">
            <input disabled={code.length !== 8 || error || searching} className="form-check-input" type="checkbox" role="switch" onClick={handleSwitch}></input>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Pagar con puntos</label>
          </div>
          {searching && <Alert className="d-flex align-items-center" color="warning"><Spinner className="me-3" size={6}></Spinner> Buscando </Alert>}
          {showPoints && <Alert className="d-flex align-items-center" color="info">Puntos disponibles: {points.points}</Alert>}
          {error && <Alert className="d-flex align-items-center" color="danger">{errorMessage}</Alert>}
        </div>
    </div>
  );
}

export default MemberCodeInput;
