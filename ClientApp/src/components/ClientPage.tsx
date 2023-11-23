import React from "react";
import CatalogPage from "./CatalogPage";
import BuyClient from "./BuyClient";

function ClientPage() {
  return (
    <div>
      <CatalogPage modalContent={BuyClient}  />
    </div>
  );
}

export default ClientPage;
