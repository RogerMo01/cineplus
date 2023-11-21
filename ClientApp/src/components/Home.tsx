import React, { Component } from 'react';
import './Home.css';
import Footer from './Footer';

function ReservaButton() {
  const islocalTesting = process.env.REACT_APP_LOCAL_TESTING;
  const port = process.env.REACT_APP_PORT;
  const networkIp = process.env.REACT_APP_NETWORK_IP;

  const home = (islocalTesting) ? `https://localhost:${port}` : `https://${networkIp}:${port}`;

  function handleClick() {
    window.location.href = home + '/log-in';
  }

  return (
    <button onClick={handleClick} className="btn btn-primary but btn-lg">Reserva Ya</button>
  );
}


export class Home extends Component {
  static displayName: string = Home.name;

  render(): JSX.Element {
    return (
      <div className="container mt-4 mb-4 changi">
        <div className='row mb-3'>
          <div className='col-md-6'>
            <h1 className='slogan slogan1' >Tu historia, <br />nuestro escenario</h1>
            <p className='parrafo'>
              Encuentra tu escape en las obras cinematográficas<br />
              que te ofrecemos.
            </p>
          </div>
          <div className='col-md-6'>
            <img src='pexels-pavel-danilyuk-7234389.jpg' alt='cine+1' className='img-fluid imagen' />
          </div>
        </div>
        <hr className="my-5" />
        <div className='row auxi'>
          <div className='col-md-4'>
            <img src='pexels-angello-13111754.jpg' alt='cine+5' className='img-fluid imagen' />
          </div>
          <div className='col-md-6'>
            <h1 className='slogan auxi1'>
              Explora el séptimo arte
              y sumérgete en el mundo <br />
              de emociones de<br /> nuestro cine
            </h1>
            <p className='parrafo auxi1'>
              Prepárate para una experiencia inolvidable en nuestra plataforma
              dedicada al séptimo arte. Aquí podrás explorar y reservar tus entradas
              para las películas más emocionantes y esperadas.
              ¡No te pierdas la oportunidad de vivir una experiencia de cine
              como nunca antes!
            </p>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-md-6'>
            <h1 className='slogan'>
              Disfruta de lo bello que ofrecemos
            </h1>
            <p className='parrafo'>
              La belleza del cine radica en su capacidad de contar
              historias de una manera que no puede ser igualada por
              ningún otro medio. El cine puede utilizar el sonido,
              la imagen y el movimiento para crear una experiencia
              sensorial que es única. También explora
              temas complejos y profundos de una manera que nos hace
              reflexionar sobre nuestras propias vidas.
            </p>
          </div>
          <div className='col-md-4'>
            <img src='pexels-pavel-danilyuk-7234446.jpg' alt='cine+7' className='img-fluid imagen' />
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-md-4'>
            <img src='pexels-linda-gschwentner-11718584.jpg' alt='cine+6' className='img-fluid imagen' />
          </div>
          <div className='col-md-6'>
            <h1 className='slogan auxi1'>
              Ya es tiempo de reservar <br />
              tu asiento<br />
            </h1>
            <p className='parrafo auxi1'>
              Planifica tu noche de cine con anticipación reservando tu asiento
              a través de nuestra página web fácil de usar.
              Evita las largas filas y asegúrate la mejor vista en la sala.
              ¡Reserva tu asiento ahora y prepárate para quedar cautivado
              por la magia del cine!
            </p>
            <ReservaButton />
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
