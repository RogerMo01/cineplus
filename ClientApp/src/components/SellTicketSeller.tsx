import React, { FormEvent, useEffect, useState } from "react";
import "./SellTicketSeller.css";
import Form from "react-bootstrap/Form";
import { Discount, MovieSchedule, Schedule, Seat, UserPayload } from "../types/types";
import fetch from "./Fetch";
import parseDate from "./DateParser";
import Post from "./ProcessPost";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import MemberCodeInput from "./MemberCodeInput";
import MemberClientSwitch from "./MemberClientSwitch";

interface Props {
  scheduleEndpoint: string;
  seatEndpoint: string;
  discountEndpoint: string;
  buyEndpoint: string;
  membersEndpoint: string;
  scheduledMovieId?: string;
  scheduledMovie?: string;
  scheduledRoom?: string;
  scheduledDate?: Date;
}

function SellTicketSeller({scheduleEndpoint, seatEndpoint, discountEndpoint, buyEndpoint, membersEndpoint, scheduledMovieId, scheduledMovie, scheduledRoom, scheduledDate }: Props) {

  const [role, setRole] = useState('');
  const [isMember, setIsMember] = useState<{member: boolean}>({member: false})

  const [schedule, setSchedule] = useState<MovieSchedule[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [selectedSeat, setSelectedSeat] = useState(seats.length > 0 ? seats[0].code : '');
  const [selectedDiscountValue, setSelectedDiscountValue] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(1);

  const [price, setPrice] = useState(0);
  const [points, setPoints] = useState(0);

  const [code, setCode] = useState("");
  const [pointsPayment, setPointsPayment] = useState(false);
  const [pointsRefresh, setPointsRefresh] = useState(false);

  const [pointsPaymentClient, setPointsPaymentClient] = useState(false);

  useEffect(() => {
    fetch(scheduleEndpoint, setSchedule);
    fetch(discountEndpoint, setDiscounts);
    fetch(membersEndpoint + '/ismember', setIsMember);

    const token = localStorage.getItem('sessionToken');
    if(token){
      const decodedToken = jwtDecode<UserPayload>(token);
      setRole(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(schedule.length > 0) {
      setSelectedSchedule(scheduledMovieId ? scheduledMovieId : schedule[0].id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);
  
  useEffect(() => {
    if(seats.length > 0) {setSelectedSeat(seats[0].code);}
  }, [seats]);

  useEffect(() => {
    const price = getPriceById(selectedSchedule, schedule) * (1 - selectedDiscountValue)
    setPrice(parseFloat(price.toFixed(2)))
    const points = getPointsById(selectedSchedule, schedule) * (1 - selectedDiscountValue)
    setPoints(Math.floor(points))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDiscountValue, selectedSchedule]);

  useEffect(() => {
    fetch(seatEndpoint + `/${selectedSchedule}`, setSeats);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSchedule]);


  function getPriceById(id: string, schedules: MovieSchedule[]): number {
    const schedule = schedules.find(schedule => schedule.id === id);
    return schedule ? schedule.price : 0;
  }
  function getPointsById(id: string, schedules: MovieSchedule[]): number {
    const schedule = schedules.find(schedule => schedule.id === id);
    return schedule ? schedule.points : 0;
  }
  
  const handleChangeSelectedSchedule = (e: React.ChangeEvent) => {
    const newValue = (e.target as HTMLInputElement).value;
    setSelectedSchedule(newValue);
  }

  const handleChangeSelectedSeat = (e: React.ChangeEvent) => {
    const newValue = (e.target as HTMLInputElement).value;
    setSelectedSeat(newValue);
  }

  const handleChangeSelectedDiscount = (e: React.ChangeEvent) => {
    const newValue = (e.target as HTMLInputElement).value;
    const [discountId, discountValue] = newValue.split(',');

    setSelectedDiscount(parseInt(discountId));
    setSelectedDiscountValue(parseFloat(discountValue));
  }
  

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const request = role === 'seller' 
    ? {
      MovieProgId: selectedSchedule,
      SeatCode: selectedSeat,
      Discount: selectedDiscount,
      PointsPayment: pointsPayment,
      Code: code.length === 8 ? code : null
    }
    : {
      MovieProgId: selectedSchedule,
      SeatCode: selectedSeat,
      Discount: selectedDiscount,
      PointsPayment: pointsPaymentClient,
      Code: code.length === 8 ? code : null
    }

    // console.log('compra realizada');
    // console.log('codigo: ' + request.Code);

    const response = Post(request, buyEndpoint, seatEndpoint + `/${selectedSchedule}`, setSeats);
    setPointsRefresh(!pointsRefresh);

    if(await response){
      if(role === 'client'){
        toast.info("Comprobante disponible en la página de compras", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
    }
  }

  
  const [disabledButton, setDisabledButton] = useState(false);

  return (
    <div className="fullts-container border rounded">
      <h2 className="text-center form-element">Reservar Ticket</h2>

      <div className="form-container container">
        <form onSubmit={handleSubmit}>
          {seats.length === 0 && <div className="alert alert-danger" role="alert">
            No hay butacas disponibles para esa programación!
          </div>}

          <div className="form-element">
            <Form.Label>Seleccionar Programación</Form.Label>
            <Form.Select 
              onChange={handleChangeSelectedSchedule}
              disabled={scheduledMovieId ? true : false}
              >
              {scheduledMovieId 
              ? <option key={scheduledMovieId} value={scheduledMovieId}>{parseDate(scheduledDate ? scheduledDate.toString() : new Date().toString()) + ' | ' + scheduledMovie + ' | ' + scheduledRoom}</option>
              : schedule.map(s => (
                <option key={s.id} value={s.id}>{parseDate(s.date.toString()) + ' | ' + s.movieTitle + ' | ' + s.roomName}</option>
              ))}
            </Form.Select>
          </div>

          <div className="inline-container">
            <div className="form-element">
              <Form.Label>Seleccionar Butaca</Form.Label>
              <Form.Select value={selectedSeat} onChange={handleChangeSelectedSeat} disabled={seats.length === 0 ? true : false}>
                {seats.map(s => (
                  <option key={s.code} value={s.code}>{s.code}</option>
                ))}
              </Form.Select>
            </div>
            <div className="form-element inline-item">
              <Form.Label>Seleccionar Descuento</Form.Label>
              
              <Form.Select onChange={handleChangeSelectedDiscount} defaultValue={'1,0'}>
                {/* <option key="none" value={'0,0'}>Ninguno</option> */}
                {discounts.map(d => (
                  <option key={d.id} value={`${d.id},${d.percent}`}>{d.concept}</option>
                ))}
              </Form.Select>
            </div>
          </div>
          
          {role === 'seller' 
          ? <div className="form-element club-input">
            <Form.Label>Código de miembro</Form.Label>
            <MemberCodeInput setDisabledButton={setDisabledButton} pointsEndpoint={membersEndpoint} pointsPrice={points} code={code} setCode={setCode} pointsPaymentSetter={setPointsPayment} pointsPayment={pointsPayment} pointsRefresh={pointsRefresh} />
          </div>
          : <div>
              {/* <div className="form-check form-switch">
                <input disabled={false} className="form-check-input" type="checkbox" role="switch" onClick={handleSwitch}></input>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Pagar con puntos</label>
              </div> */}
              {isMember.member && <MemberClientSwitch memberEndpoint={membersEndpoint} pointsPrice={points} pointsPayment={pointsPaymentClient} pointsPaymentSetter={setPointsPaymentClient} codeSetter={setCode} pointsRefresh={pointsRefresh}  disableBtn={setDisabledButton}/>}
            </div>
          }
          
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit" disabled={seats.length === 0 || disabledButton}>
              Reservar Ticket
            </button>
          </div>
        </form>
        

        <div className="border-top mt-5">
          <p className="text-sm-end fs-4">Importe: ${price}</p>
          <p className="text-sm-end fs-4">Importe puntos: {points}</p>
        </div>
        
      </div>
      <ToastContainer/>
    </div>
  );
}

export default SellTicketSeller;
