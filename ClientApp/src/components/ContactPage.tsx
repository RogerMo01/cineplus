import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsWhatsapp } from 'react-icons/bs';
import { BsTelegram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsSignpostFill } from "react-icons/bs";
import { BsTelephoneFill } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
//@ts-ignore
import imagen from "./estamos_aqui.jpg";
interface Props {

}
function ContactPage(params: Props) {
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-6">

                    <h1 className="text-center">Contácta con nosotros</h1>
                    <p>Esperamos que hayas disfrutado explorando nuestro rincón virtual. Ahora que has tenido un vistazo a lo que ofrecemos, queremos estar aún más cerca de ti.
                        La página de "Contáctanos" es como nuestra puerta mágica; al traspasarla, entras en un mundo donde tus preguntas se convierten en respuestas y tus sugerencias en mejoras palpables. <br /> <br />
                        Ya sea que desees compartir tus impresiones, plantearnos alguna pregunta o simplemente saludar, estamos aquí para ti. Creemos que cada interacción es una oportunidad de hacer nuevos amigos y aprender algo nuevo.
                        Encuentra nuestros enlaces en redes sociales para seguir conectados.¡Gracias por elegirnos! Estamos emocionados de tener contacto contigo. <br />
                        Con cariño,<br />
                        El Equipo de Cine+
                    </p>

                    <p><u><strong>Horario de atención al cliente</strong></u>: De lunes a jueves: de 8:00 a 20:00 horas. Viernes: de 8:00 a 19:00 horas. Fines de semana y festivos: de 10:00 a 18:00 horas.</p>
                    <p>Si tienes alguna duda o sugerencia puedes contactarnos a través de nuestro correo electrónico: <a href="https://localhost:44492/"><strong><u>peliculascine+@gmail.com</u></strong></a> </p>
                    <p></p>
                </div>
                <div className="col-md-6">
                    <h2 className="text-center">Puedes seguirnos en nuestras redes sociales</h2>
                    <h4 className="text-center">Facebook <a href="https://localhost:44492/"><BsFacebook className="text-primary" /> </a></h4>
                    <h4 className="text-center">Whatsapp <a href="https://localhost:44492/"><BsWhatsapp className="text-success" /></a></h4>
                    <h4 className="text-center">Telegram <a href="https://localhost:44492/"><BsTelegram className="text-info" /></a></h4>
                    <h4 className="text-center">Instagram <a href="https://localhost:44492/"><BsInstagram className="text-danger" /></a></h4>
                    <br />
                    <br />
                    <h5 className="text-center">Nuestra sede se encuentra aquí</h5>
                    <div className="d-flex justify-content-center">
                        <img
                            src={imagen}
                            alt="Ubicacion de la compañia"
                            className="img-fluid w-50 mb-5"
                        />
                    </div>
                    <h5 className="text-center"><BsSignpostFill className="text-warning" />
                        C/ Juan Bruno Zayas #157, e/ San Mariano y Vista Alegre <br />
                        Diez de Octubre, La Habana, Cuba</h5>
                    <h5 className="text-center mb-3"><BsTelephoneFill className="text-warning" />
                        +53 58454733
                    </h5>
                </div>
            </div>
        </div >
    );
}
export default ContactPage;