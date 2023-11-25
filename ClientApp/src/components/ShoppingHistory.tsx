import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { ShopItem } from "../types/types";
import fetch from "./Fetch";
import parseDate from "./DateParser";
import Delete from "./ProcessDelete";

const shopListEndpoint = '/api/shoppinghistory';

// const list: ShopItem[] = [
//   {
//     id: '1',
//     movie: 'Inception',
//     room: 'A',
//     date: new Date(),
//     datePurchase: new Date(),
//     seat: 'A1',
//     payed: 10,
//   },
//   {
//     id: '2',
//     movie: 'The Shawshank Redemption',
//     room: 'B',
//     date: new Date(),
//     datePurchase: new Date(),
//     seat: 'B2',
//     payed: 12,
//   },
//   {
//     id: '3',
//     movie: 'The Dark Knight',
//     room: 'C',
//     date: new Date(),
//     datePurchase: subHours(new Date(), 2),
//     seat: 'C3',
//     payed: 15,
//   },
//   {
//     id: '4',
//     movie: 'Pulp Fiction',
//     room: 'D',
//     date: new Date(),
//     datePurchase: subHours(new Date(), 1),
//     seat: 'D4',
//     payed: 8,
//   },
//   {
//     id: '5',
//     movie: 'Forrest Gump',
//     room: 'E',
//     date: new Date(),
//     datePurchase: new Date(),
//     seat: 'E5',
//     payed: 11,
//   },
//   {
//     id: '6',
//     movie: 'The Matrix',
//     room: 'F',
//     date: new Date(),
//     datePurchase: new Date(),
//     seat: 'F6',
//     payed: 14,
//   },
//   {
//     id: '7',
//     movie: 'Schindler\'s List',
//     room: 'G',
//     date: new Date(),
//     datePurchase: new Date(),
//     seat: 'G7',
//     payed: 13,
//   },
//   {
//     id: '8',
//     movie: 'The Godfather',
//     room: 'H',
//     date: new Date(),
//     datePurchase: new Date(),
//     seat: 'H8',
//     payed: 16,
//   },
//   {
//     id: '9',
//     movie: 'Fight Club',
//     room: 'I',
//     date: new Date(),
//     datePurchase: new Date(),
//     seat: 'I9',
//     payed: 9,
//   },
//   {
//     id: '10',
//     movie: 'Avatar',
//     room: 'J',
//     date: new Date(),
//     datePurchase: new Date(),
//     seat: 'J10',
//     payed: 18,
//   },
// ];

function ShoppingHistory() {
  const [shopList, setShopList]= useState<ShopItem[]>([]);

  useEffect(() => {
    fetch(shopListEndpoint, setShopList);
  }, [])
  
  function handleCancel(id: string) {
    Delete(id, shopListEndpoint, shopListEndpoint, setShopList);
  }

  return (
    <div>
      <h2 className="header">Historial de compras</h2>
      <div className="table-container">
        <table className="table table-striped inside-table">
          <thead>
            <tr>
              <th>Película</th>
              <th>Horario</th>
              <th>Sala</th>
              <th>Butaca</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="border">
            {shopList.sort((a, b) => b.datePurchase.getTime() - a.datePurchase.getTime()).map((item) => (
              <tr key={item.id}>
                <td>{item.movie}</td>
                <td>{parseDate(item.date.toString())}</td>
                <td>{item.room}</td>
                <td>{item.seat}</td>
                
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
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ShoppingHistory;
