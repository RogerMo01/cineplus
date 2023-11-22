import React, { ReactNode, useEffect, useState } from "react";
import {
  Card,
  CardBody,
} from "reactstrap";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { MovieSchedule } from "../types/types";
import fetch from "./Fetch";
import parseDate from "./DateParser";
import "./MovieManager.css";

interface Props {
  movieId: number;
  name: string
  scheduleEndpoint: string;
  showModal: boolean;
  toggle: () => void;
  handleBuy: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function MoviesScheduledList({
  movieId,
  name,
  scheduleEndpoint,
  showModal,
  toggle,
  handleBuy,
}: Props) {
  const [schedule, setSchedule] = useState<MovieSchedule[]>([]);

  useEffect(() => {
    fetch(scheduleEndpoint, setSchedule);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const movieNotScheduled = (
    <div className="containet lead">
      No hay programaciones para esta película
    </div>
  );

  return (
    <Modal size="lg" isOpen={showModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>📅 Programaciones Disponibles para: {name}</ModalHeader>
      <ModalBody>
        {schedule.filter(x => x.movie === movieId).length === 0
        ? movieNotScheduled
        :<Card>
          <CardBody>
            <div className="table-container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sala</th>
                    <th>Horario</th>
                    <th>Precio</th>
                    <th>Puntos</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.filter(x => x.movie === movieId).map((s) => (
                    <tr key={s.id}>
                      <td>{s.room}</td>
                      <td>{parseDate(s.date.toString())}</td>
                      <td>$ {s.price}</td>
                      <td>{s.points} ptos</td>
                      <td className="editColumn">
                        <div className="modifyButtons">
                          <button
                            className="btn btn-success modifyButton"
                            onClick={handleBuy}
                          >
                            Comprar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
        }
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cerrar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default MoviesScheduledList;
