import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { Button } from "reactstrap";
import { FaFileDownload } from "react-icons/fa";
import { Ticket } from "../types/types";
import fetch from "../utils/Fetch";
import parseDate from "../utils/DateParser";

interface ReceiptProps {
  endpoint: string;
  code: string;
}

function TicketReceipt({ endpoint, code }: ReceiptProps) {
  const [receiptData, setReceiptData] = useState<Ticket>();

  useEffect(() => {
    fetch(endpoint + `/${code}`, setReceiptData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generatePDF = () => {
    if (receiptData) {
      // Crear un nuevo documento PDF
      var doc = new jsPDF({ format: "a4" });
      const pageHeight =
        doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      const pageWidth =
        doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
      console.log(pageHeight + "," + pageWidth);

      // Watermark
      var imagenURL = "WaterMark.png";
      doc.addImage(
        imagenURL,
        "PNG",
        30,
        10,
        doc.internal.pageSize.getWidth() - 50,
        doc.internal.pageSize.getWidth() - 60
      );

      // Header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.text("COMPROBANTE DE VENTA", pageWidth / 2, 18, {
        align: "center",
      });
      doc.setFontSize(18);
      doc.text("Cine+", pageWidth / 2, 28, { align: "center" });
      doc.setFontSize(14);

      doc.setLineWidth(0.5);
      doc.line(10, 5, pageWidth - 10, 5);
      doc.line(10, 35, pageWidth - 10, 35);
      doc.line(10, 250, pageWidth - 10, 250);
      doc.line(10, 5, 10, 250);
      doc.line(pageWidth - 10, 5, pageWidth - 10, 250);

      doc.setFontSize(12);
      doc.text("", pageWidth / 2, 50, {
        align: "center",
      });

      // Buy ID
      doc.setTextColor(255, 0, 0);
      doc.setFont("JetBrains Mono", "normal");
      doc.text(receiptData.id, pageWidth / 2, 45, {
        align: "center",
      });

      doc.setLineWidth(0.1);
      doc.line(66, 50, pageWidth - 66, 50);

      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica");
      doc.text("Fecha compra:", pageWidth / 2, 60, {
        align: "center",
      });
      doc.text(parseDate(receiptData.datePurchase.toString()), pageWidth / 2, 65, {
        align: "center",
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      doc.text("Información de la programación:", 20, 78);
      doc.text("Horario", 30, 85);
      doc.text(`: ${parseDate(receiptData.date.toString())}`, 50, 85);
      doc.text("Película", 30, 90);
      doc.text(`: ${receiptData.movie}`, 50, 90);
      doc.text("Sala", 30, 95);
      doc.text(`: ${receiptData.room}`, 50, 95);
      doc.text("Butaca", 110, 95);
      doc.text(`: ${receiptData.seat}`, 123, 95);

      doc.setLineWidth(0.1);
      doc.line(30, 105, pageWidth - 30, 105);

      doc.setFontSize(15);
      doc.setFont("helvetica");
      doc.text(`Total pagado : $${Number(receiptData.payed.toFixed(2))}`, 140, 120);

      doc.addImage(
        "FooterLogo.png",
        "PNG",
        pageWidth / 2 - 30 + 15,
        210,
        30,
        28
      );

      doc.setFontSize(10);
      doc.text("Gracias por ser parte de nuestra familia", pageWidth / 2, 245, {
        align: "center",
      });

      // Guardar el documento en un archivo
      doc.save("comprobante_venta.pdf");
    }
  };

  return (
    <div>
      <Button color="success" onClick={generatePDF}>
        <FaFileDownload className="me-1" />
        Imprimir
      </Button>
    </div>
  );
}

export default TicketReceipt;
