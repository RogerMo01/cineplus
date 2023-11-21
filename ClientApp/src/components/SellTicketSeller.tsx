import React, { FormEvent, useEffect, useState } from "react";
import "./SellTicketSeller.css";
import Form from "react-bootstrap/Form";
import { Discount, Schedule, Seat } from "../types/types";
import fetch from "./Fetch";
import parseDate from "./DateParser";
import Post from "./ProcessPost";
import { ToastContainer } from "react-toastify";

interface Props {
  scheduleEndpoint: string;
  seatEndpoint: string;
  discountEndpoint: string;
  buyEndpoint: string;
}

function SellTicketSeller({scheduleEndpoint, seatEndpoint, discountEndpoint, buyEndpoint }: Props) {

  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [selectedSeat, setSelectedSeat] = useState('');
  const [selectedDiscountValue, setSelectedDiscountValue] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(1);

  const [price, setPrice] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetch(scheduleEndpoint, setSchedule);
    fetch(discountEndpoint, setDiscounts);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(schedule.length > 0) {setSelectedSchedule(schedule[0].id);}
  }, [schedule]);
  
  useEffect(() => {
    if(seats.length > 0) {setSelectedSeat(seats[0].code);}
  }, [seats]);

  useEffect(() => {
    const price = getPriceById(selectedSchedule, schedule) * (1 - selectedDiscountValue)
    setPrice(parseFloat(price.toFixed(2)))
    const points = getPointsById(selectedSchedule, schedule) * (1 - selectedDiscountValue)
    setPoints(parseInt(points.toFixed(0)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDiscountValue, selectedSchedule]);

  useEffect(() => {
    fetch(seatEndpoint + `/${selectedSchedule}`, setSeats);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSchedule]);


  function getPriceById(id: string, schedules: Schedule[]): number {
    const schedule = schedules.find(schedule => schedule.id === id);
    return schedule ? schedule.price : 0;
  }
  function getPointsById(id: string, schedules: Schedule[]): number {
    const schedule = schedules.find(schedule => schedule.id === id);
    return schedule ? schedule.points : 0;
  }
  
  const handleChangeSelectedSchedule = (e: React.ChangeEvent) => {
    const newValue = (e.target as HTMLInputElement).value;
    setSelectedSchedule(newValue);
    fetch(seatEndpoint + `/${selectedSchedule}`, setSeats);
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
  

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const request = {
      MovieProgId: selectedSchedule,
      Seat: selectedSeat,
      Discount: selectedDiscount
    }

    Post(request, buyEndpoint, seatEndpoint + `/${selectedSchedule}`, setSeats);
  }

  return (
    <div className="full-container border rounded">
      <h2 className="text-center form-element">Vender Ticket</h2>

      <div className="form-container container">
        <form onSubmit={handleSubmit}>
          {seats.length === 0 && <div className="alert alert-danger" role="alert">
            No hay butacas disponibles para esa programación!
          </div>}

          <div className="form-element">
            <Form.Label>Seleccionar Programación</Form.Label>
            <Form.Select onChange={handleChangeSelectedSchedule}>
              {schedule.map(s => (
                <option key={s.id} value={s.id}>{parseDate(s.date.toString()) + ' | ' + s.movie + ' | ' + s.room}</option>
              ))}
            </Form.Select>
          </div>

          <div className="inline-container">
            <div className="form-element">
              <Form.Label>Seleccionar Butaca</Form.Label>
              <Form.Select onChange={handleChangeSelectedSeat} disabled={seats.length === 0 ? true : false}>
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
          
          <button className="btn btn-primary float-end" type="submit" disabled={seats.length === 0 ? true : false}>
            Reservar Ticket
          </button>
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