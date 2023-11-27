import React from "react";
import "./AboutPage.css";
import { Card, CardBody, CardGroup, CardImg, CardText, CardTitle, Col, Row } from "reactstrap";

interface Props { }

function AboutPage(props: Props) {

  return (

    <div className="container">
      <img src="/Cinema.jpg" alt="Imagen principal" className="main-image" />

      <div className="text-container">
        <p className="caption">
          "Nuestra misión es ser el destino perfecto para los amantes del cine.
          Aquí, te invitamos a disfrutar de su magia en la pantalla grande,
          conectándote con emociones inolvidables y experiencias cinematográficas únicas"
        </p>

        <hr className="division-line" />

        <h2 className="section-title"> ¿QUIENES SOMOS?</h2>

        <p className="about-us">
          "Cine+" nació de la pasión compartida por el cine y la tecnología, cuando un grupo de entusiastas
          del séptimo arte se propuso mejorar la experiencia de ir al cine. Inspirados por la idea de hacer
          que la compra de entradas sea más conveniente y accesible, surgió la visión de crear una plataforma
          innovadora que conectara a los amantes del cine con las películas que adoran. No somos solo una plataforma
          de venta de entradas; somos el acceso directo a historias que te emocionarán, te harán reír y te mantendrán
          al borde de tu asiento. Únete a nosotros mientras continuamos escribiendo nuestra historia, una entrada a la vez.
        </p>
      </div>

      <div className="card-container">
        <CardGroup className="card-group">

          <Card className="about-card">
            <CardImg src="card1.jpg" className="card-Img" alt="Pasión Cinematográfica" top />
            <CardBody>
              <CardTitle className="text-center" tag="h4"> Nuestra Pasión Cinematográfica</CardTitle>
              <CardText className="text-justify">
                En Cine+ te brindamos desde los estrenos más emocionantes hasta
                las películas más taquilleras. Cada película es una historia que
                merece ser contada, y nosotros estamos aquí para hacer que disfrutes de cada momento.
                Nos esforzamos por crear un espacio donde tu pasión por el cine se encuentre con la excelencia.
              </CardText>
            </CardBody>
          </Card>

          <Card className="about-card">
            <CardImg src="card2.jpg" className="card-Img" alt="Innovación en la Venta de Entradas" top />
            <CardBody>
              <CardTitle className="text-center" tag="h4"> Innovación en la Venta de Entradas</CardTitle>
              <CardText className="text-justify">
                ¿Quieres reservar tu entrada? Pues olvídate de las largas colas y las esperas. Con Cine+ puedes asegurar tu entrada
                con solo unos clics y acceder a información detallada sobre horarios y películas. Cada entrada es una oportunidad
                para ahorrar, nuestro programa de descuentos te brinda ofertas personalizadas que hacen que cada experiencia sea más
                asequible y gratificante.
              </CardText>
            </CardBody>
          </Card>

          <Card className="about-card">
            <CardImg src="card3.jpg" className="card-Img" alt="Más que Entradas, Una Experiencia Exclusiva" top />
            <CardBody>
              <CardTitle className="text-center" tag="h4"> Más que Entradas, Una Experiencia Exclusiva</CardTitle>
              <CardText className="text-justify">
                Conviértete en Socio Cinéfilo y descubre un mundo de privilegios. Obtén acceso exclusivo a eventos de preestreno y
                descuentos adicionales. Además, acumula puntos con cada compra para disfrutar de entradas
                gratuitas. Pero eso no es todo, ¡queremos premiarte desde el principio! Al asociarte,
                te obsequiamos automáticamente 20 puntos que podrás canjear más adelante.
              </CardText>
            </CardBody>
          </Card>

        </CardGroup>
      </div>

    </div>
  );
}

export default AboutPage;
