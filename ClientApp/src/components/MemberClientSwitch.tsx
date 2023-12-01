import React, { useEffect, useState } from "react";
import fetch from "../utils/Fetch";
import { Alert } from "reactstrap";

interface Props {
    // setDisabledButton: React.Dispatch<React.SetStateAction<boolean>>;
    memberEndpoint: string;
    pointsPrice: number;
    pointsPaymentSetter: React.Dispatch<React.SetStateAction<boolean>>;
    pointsPayment: boolean;
    codeSetter: React.Dispatch<React.SetStateAction<string>>;
    pointsRefresh: boolean;
    disableBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

function MemberClientSwitch({memberEndpoint, pointsPrice, pointsPaymentSetter, pointsPayment, codeSetter, pointsRefresh, disableBtn} : Props) {
  const [info, setInfo] = useState<{code: string, points: number}>({code : '', points: 0});
  const [error, setError] = useState(false);

  
  useEffect(() => {
    fetch(memberEndpoint + '/info', setInfo)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointsRefresh, pointsPrice, pointsPayment])
  
  
  useEffect(() => {
    disableBtn(false);
    setError(false);
    codeSetter(info.code);
    console.log('info: ')
    console.log(info)

    if(pointsPrice > info.points){
        if(pointsPayment) {
            disableBtn(true);
            setError(true);
        }

    }
    else{
        disableBtn(false);
        setError(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, pointsPrice, pointsPayment])

  function handleSwitch(event: React.MouseEvent): void {
    pointsPaymentSetter(!pointsPayment);
    codeSetter(info.code);
  }

  return (
    <div>
        <div className="">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" onClick={handleSwitch} id="switch"></input>
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Pagar con puntos</label>
          </div>
          {error && <Alert color="danger">Puntos insuficientes</Alert>}
        </div>
    </div>
  );
}

export default MemberClientSwitch;
