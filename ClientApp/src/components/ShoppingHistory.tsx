import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ShopItem } from "../types/types";
import fetch from "../utils/Fetch";
import parseDate from "../utils/DateParser";
import Delete from "../utils/ProcessDelete";
import TicketReceipt from "./TicketReceipt";

const shopListEndpoint = '/api/shoppinghistory';
const receiptEndpoint = '/api/receipt';

function ShoppingHistory() {
  const [shopList, setShopList] = useState<ShopItem[]>([]);

  useEffect(() => {
    fetch(shopListEndpoint, setShopList);
  }, [])

  function handleCancel(id: string) {
    Delete(id, shopListEndpoint, shopListEndpoint, setShopList);
  }

  return (
    <div className="container mt-5">
      <h2 className="header">Historial de compras activas</h2>
      <div className="table-container">
        {shopList.length === 0 ? <div className="alert alert-info" role="alert">No hay compras</div> : <table className="table table-striped inside-table">
          <thead>
            <tr>
              <th>Película</th>
              <th>Horario</th>
              <th>Sala</th>
              <th>Butaca</th>
              <th>Comprobante</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="border">
            {shopList.map((item) => (
              <tr key={item.id}>
                <td>{item.movie}</td>
                <td>{parseDate(item.date.toString())}</td>
                <td>{item.room}</td>
                <td>{item.seat}</td>

                <td className="editColumn">
                  <div className="modifyButtons">
                    <TicketReceipt endpoint={receiptEndpoint} code={item.id} />
                  </div>
                </td>

                <td className="editColumn">
                  <div className="modifyButtons">
                    <button
                      className="btn btn-danger modifyButton"
                      onClick={() => handleCancel(item.id)}
                    >
                      Cancelar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ShoppingHistory;
