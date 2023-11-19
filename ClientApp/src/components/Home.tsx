import React, { Component } from 'react';
import './Home.css';
//@ts-ignore
import imagen1 from './pexels-pavel-danilyuk-7234389.jpg';
//@ts-ignore
import imagen2 from './pexels-markus-spiske-2672097.jpg';
//@ts-ignore
import imagen3 from './pexels-lisa-fotios-2923675.jpg';
//@ts-ignore
import imagen4 from './pexels-cottonbro-studio-8261568.jpg';
//@ts-ignore
import imagen5 from './pexels-angello-13111754.jpg';
//@ts-ignore
import imagen6 from './pexels-linda-gschwentner-11718584.jpg';


export class Home extends Component {
  static displayName: string = Home.name;

  render(): JSX.Element {
    return (

      <div className="container mt-4 mb-4">
        {/*<div className='cont'>
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
    </div>*/}
        {/* <div className='inrow_container inrow_container1'>
          <div className='incol_container'>
            <h1 className='slogan slogan1'>
              Tu historia, <br />
              nuestro escenario
            </h1> 
            <div className='imagen imagen4'></div>
          </div>
          <div className='inrow_container'>
            <div className='incol_container incol_container1'>
              <div className='imagen imagen3'></div>
              <div className='imagen imagen1'></div>
            </div>
            <div className='imagen imagen2'></div>
          </div>
        </div> */}
        <div className='row mb-3'>
          <div className='col-md-6'>
            <h1 className='slogan slogan1' >Tu historia, <br />nuestro escenario</h1>
            <p className='parrafo'>
              Encuentra tu escape en las obras cinematográficas<br />
              que te ofrecemos.
            </p>
          </div>
          <div className='col-md-6'>
            <img src={imagen1} alt='cine+1' className='img-fluid imagen' />
          </div>
        </div>
        <div className='row auxi'>
          <div className='col-md-4'>
            <img src={imagen5} alt='cine+5' className='img-fluid imagen' />
          </div>
          <div className='col-md-6'>
            <h1 className='slogan'>
              Explora el séptimo arte <br />
              y sumérgete en el mundo<br />
              de emociones de nuestro cine
            </h1>
            <p className='parrafo'>
              Prepárate para una experiencia inolvidable en nuestra plataforma<br />
              dedicada al séptimo arte. Aquí podrás explorar y reservar tus entradas<br />
              para las películas más emocionantes y esperadas. <br />
              ¡No te pierdas la oportunidad de vivir una experiencia de cine <br />
              como nunca antes!
            </p>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-md-6'>
            <h1 className='slogan'>
              Ya es tiempo de reservar <br />
              tu asiento<br />
            </h1>
            <p className='parrafo'>
              Planifica tu noche de cine con anticipación reservando tu asiento <br />
              a través de nuestra página web fácil de usar. <br />
              Evita las largas filas y asegúrate la mejor vista en la sala. <br />
              ¡Reserva tu asiento ahora y prepárate para quedar cautivado <br />
              por la magia del cine!
            </p>
          </div>
          <div className='col-md-4'>
            <img src={imagen6} alt='cine+6' className='img-fluid imagen' />
          </div>
        </div>
      </div>
    );
  }
}
