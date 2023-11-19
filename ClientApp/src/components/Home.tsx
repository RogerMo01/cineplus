import React, { Component } from 'react';
import './Home.css';
//@ts-ignore
import tuImagen from './pexels-angello-13111754.jpg';

export class Home extends Component {
  static displayName: string = Home.name;

  render(): JSX.Element {
    return (

      <div className="container">
        {/* <div className='cont'>

          <h1 className='slogan slogan1'>
            Tu historia, <br />
            nuestro escenario
          </h1>
          <p className='parrafo parrafo1'>
            Encuentra tu escape en las obras cinematográficas<br />
            que te ofrecemos.
          </p>
          <div className='imagen imagen1'></div>
          <div className='imagen imagen2'></div>
          <div className='imagen imagen3'></div>
          <div className='imagen imagen4'></div>
          <div className='imagen imagen5'></div>
          <div className='imagen imagen6'></div>
          <h1 className='slogan slogan2'>
            Explora el séptimo arte <br />
            y sumérgete en el mundo<br />
            de emociones de nuestro cine
          </h1>
          <p className='parrafo parrafo2'>
            Prepárate para una experiencia inolvidable en nuestra plataforma<br />
            dedicada al séptimo arte. Aquí podrás explorar y reservar tus entradas<br />
            para las películas más emocionantes y esperadas. <br />
            ¡No te pierdas la oportunidad de vivir una experiencia de cine <br />
            como nunca antes!
          </p>
          <h1 className='slogan slogan3'>
            Ya es tiempo de reservar <br />
            tu asiento<br />
          </h1>
          <p className='parrafo parrafo3'>
            Planifica tu noche de cine con anticipación reservando tu asiento <br />
            a través de nuestra página web fácil de usar. <br />
            Evita las largas filas y asegúrate la mejor vista en la sala. <br />
            ¡Reserva tu asiento ahora y prepárate para quedar cautivado <br />
            por la magia del cine!
          </p>
        </div> */}
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>Tu historia,<br/> nuestro escenario</h1>
            </div>
            <div className="col-md-6">
              <img src={tuImagen} alt="Descripción de la imagen" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
