import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsWhatsapp } from 'react-icons/bs';
import { BsTelegram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsSignpostFill } from "react-icons/bs";
import { BsTelephoneFill } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
interface Props {

}
function ContactPage(params: Props) {
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-7">
                    <h1 className="text-center" style={{ color: 'rgb(254, 190, 3)', fontSize: '50px'}}>¡Contacta con nosotros!</h1>
                    <br />
                    <p style={{fontSize: '17px'}}>
                        Esperamos que hayas disfrutado explorando nuestro rincón virtual. Ahora que conoces lo que ofrecemos, queremos estar aún más cerca de ti.
                        La página de "Contacto" es nuestra puerta mágica; al traspasarla, entras en un mundo donde tus preguntas se convierten en respuestas y tus sugerencias en mejoras palpables. <br /> <br />
                        Ya sea que desees compartir tus impresiones, plantearnos alguna pregunta o simplemente saludar, estamos aquí para ti. Creemos que cada interacción es una oportunidad de hacer nuevos amigos y aprender algo nuevo.
                        Haz clic en nuestros enlaces a redes sociales para seguir conectados. <br />
                    </p>
                    <hr className="division-line mt-5 mb-5"  />
                    <p>
                        <span style={{ fontSize:'17px'}}>Si tienes alguna duda o sugerencia puedes contactarnos a través de nuestro correo electrónico: </span>
                         <a href="mailto:conectadosconCine+@gmail.com" style={{ color: 'rgb(53, 109, 255)'}}><strong><u> conectadosconCine+@gmail.com</u></strong></a> 
                    </p>
                    <p >
                        <span style={{ color: 'rgb(25, 58, 148)', fontSize: '17.5px'}}><strong>Horario de atención al cliente: </strong></span> 
                        <span style={{ fontSize:'16px'}}>De lunes a jueves: de 8:00 a 20:00 horas. Viernes: de 8:00 a 19:00 horas. Fines de semana y festivos: de 10:00 a 18:00 horas.</span>
                    </p>
                    
                </div>
                
                <div className="col-md-5">
                    <br />
                    <h3 className="text-center" style={{ color: 'rgb(25, 58, 148)'}}>Puedes seguirnos en nuestras redes sociales:</h3>
                    <h5 className="text-center">Facebook <a href="https://localhost:44492/"><BsFacebook className="text-primary" /> </a></h5>
                    <h5 className="text-center">Whatsapp <a href="https://localhost:44492/"><BsWhatsapp className="text-success" /></a></h5>
                    <h5 className="text-center">Telegram <a href="https://localhost:44492/"><BsTelegram className="text-info" /></a></h5>
                    <h5 className="text-center">Instagram <a href="https://localhost:44492/"><BsInstagram className="text-danger" /></a></h5>
                    <br />
                    <br />
                    <h4 className="text-center" style={{ color: 'rgb(25, 58, 148)'}}>📍 Estamos aquí: </h4>
                    <div className="d-flex justify-content-center">
                        <img
                            src='estamos_aqui.jpg'
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