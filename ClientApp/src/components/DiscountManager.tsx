import React from "react";
import "./MovieManager.css";
import { Discount } from "../types/types";
import { RiDeleteBin2Line } from "react-icons/ri";
import DiscountModalForm from "./DiscountModalForm";
import { ToastContainer } from "react-toastify";
import { FiEdit2 } from "react-icons/fi";
import Post from "./ProcessPost";
import Delete from "./ProcessDelete";
import Put from "./ProcessPut";

interface Props {
  name: string;
  discounts: Discount[];
  path: string;
}

function DiscountManager({ name, discounts, path }: Props) {

  // ~~~~~~~~~~~~~~~ ADD Handler ~~~~~~~~~~~~~~~~~
  async function handleAddDiscount(id: number, concept: string, percent: number) {
    const request = {
      Concept: concept,
      Percent: percent,
    };

    Post(request, path);
  }

  // ~~~~~~~~~~~~~~~ DELETE Handler ~~~~~~~~~~~~~~~~~
  const handleDeleteDiscount = (id: number) => async (e: React.MouseEvent) => {
    Delete(id, path);
  };

  // ~~~~~~~~~~~~~~~ EDIT Handler ~~~~~~~~~~~~~~~~~
  async function handleEditDiscount(id: number, concept: string, percent: number) {
    const request = {
      Concept: concept,
      Percent: percent,
    };

    Put(id, request, path);
  }

  return (
    <div className="full-container">
      <h2 className="header">{name}</h2>

      <div className="toolButtons">
        <DiscountModalForm
          type="new"
          clickHandler={handleAddDiscount}
          conceptPh=""
          percentPh={0}
          buttonConfig={{
            className: "align-right",
            color: "primary",
            content: <>Nuevo</>,
          }}
          modifyId={-1}
        />
      </div>

      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Descuento(%)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((disc) => (
              <tr key={disc.id}>
                <td>{disc.concept}</td>
                <td>{disc.percent * 100}%</td>
                <td className="editColumn">
                  <div className="modifyButtons">
                    <DiscountModalForm
                      type="edit"
                      clickHandler={handleEditDiscount}
                      conceptPh={disc.concept}
                      percentPh={disc.percent}
                      buttonConfig={{
                        className: "modifyButton",
                        color: "secondary",
                        content: <FiEdit2 />,
                      }}
                      modifyId={disc.id}
                    />

                    <button
                      className="btn btn-danger modifyButton"
                      onClick={handleDeleteDiscount(disc.id)}
                    >
                      <RiDeleteBin2Line />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default DiscountManager;
