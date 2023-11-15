import React from "react";
import "./MovieManager.css";
import { Discount } from "../types/types";
import { Button } from "reactstrap";
import MovieModalForm from "./MovieModalForm";
import { RiDeleteBin2Line } from "react-icons/ri";
import DiscountModalForm from "./DiscountModalForm";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit2 } from "react-icons/fi";

interface Props {
  name: string;
  discounts: Discount[];
  path: string;
}

function DiscountManager({ name, discounts, path }: Props) {

  // ~~~~~~~~~~~~~~~ ADD Handler ~~~~~~~~~~~~~~~~~
  async function handleAddDiscount(id: number, concept: string, percent: number) {
    alert('Trying to ADD a Discount');
    const request = {
      Concept: concept,
      Percent: percent,
    };

    try {
      const response = await axios.post(path, request);

      if (response.status === 200) {
        toast.success("Inserción exitosa!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(`Error de inserción (${error})`);
      toast.error(`Error de inserción (${error})`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  }

  // ~~~~~~~~~~~~~~~ DELETE Handler ~~~~~~~~~~~~~~~~~
  const handleDeleteDiscount = (id: number) => async (e: React.MouseEvent) => {
    alert('Trying to DELETE a Discount');

    try {
      const response = await axios.delete(path + `/${id}`);

      if (response.status === 200) {
        toast.success("Eliminación exitosa!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(`Error de eliminacion (${error})`);
      toast.error(`Error de eliminación (${error})`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  // ~~~~~~~~~~~~~~~ EDIT Handler ~~~~~~~~~~~~~~~~~
  async function handleEditDiscount(id: number, concept: string, percent: number) {
    alert('Trying to EDIT a Discount');

    const request = {
      Concept: concept,
      Percent: percent,
    };

    try {
      const response = await axios.put(path + `/${id}`, request);

      if (response.status === 200) {
        toast.success("Edición exitosa!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(`Error de edición (${error})`);
      toast.error(`Error de edición (${error})`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
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
            content: <>Nueva</>,
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
    </div>
  );
}

export default DiscountManager;
