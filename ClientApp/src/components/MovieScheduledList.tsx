import React from "react";
import {
  Card,
  CardBody,
} from "reactstrap";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { MovieSchedule } from "../types/types";
import parseDate from "../utils/DateParser";
import "./MovieManager.css";

interface Props {
  movieId: number;
  name: string
  showModal: boolean;
  toggle: () => void;
  handleBuy: (id: string, room: string, date: Date) => void;
  schedule: MovieSchedule[];
}

function MoviesScheduledList({
  movieId,
  name,
  showModal,
  toggle,
  handleBuy,
  schedule
}: Props) {

  const movieNotScheduled = (
    <div className="lead">
      No hay programaciones para esta película
    </div>
  );

  return (
    <Modal size="lg" isOpen={showModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>📅 Programaciones Disponibles para: {name}</ModalHeader>
      <ModalBody>
        {schedule.filter(x => parseInt(x.movieId) === movieId).length === 0
          ? movieNotScheduled
          : <Card>
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
                    {schedule.filter(x => parseInt(x.movieId) === movieId).map((s) => (
                      <tr key={s.id}>
                        <td>{s.roomName}</td>
                        <td>{parseDate(s.date.toString())}</td>
                        <td>$ {s.price}</td>
                        <td>{s.points} ptos</td>
                        <td className="editColumn">
                          <div className="modifyButtons">
                            <button
                              className="btn btn-success modifyButton"
                              onClick={() => handleBuy(s.id, s.roomName, s.date)}
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
