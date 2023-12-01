import React from "react";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/scrollToTop";
import './Footer.css'

function Footer() {

  return (
    <div style={{backgroundColor: '#6d757d'}}>
      <div className="container">
        <footer className="text-center text-black">
          <div className="container">
            <section className="mt-5">
              <div className="row text-center d-flex justify-content-center pt-5">
                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <NavLink
                      tag={Link}
                      onClick={scrollToTop}
                      className="hover-link"
                      to={"/about-us"}
                    >
                      Sobre Nosotros
                    </NavLink>
                  </h6>
                </div>

                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <NavLink
                      tag={Link}
                      onClick={scrollToTop}
                      className="hover-link"
                      to={"/movies"}
                    >
                      Producto
                    </NavLink>
                  </h6>
                </div>

                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <NavLink
                      tag={Link}
                      onClick={scrollToTop}
                      className="hover-link"
                      to={"/contact"}
                    >
                      Contacto
                    </NavLink>
                  </h6>
                </div>
              </div>
            </section>

            <hr/>
          </div>

          <div className="text-center p-3">
            <div className="centered-container">
              <img src="/FooterLogo.png" alt="Footer" className="centered-image" height={45} width={50}/>
            </div>
            <br />
            © 2023 Todos los derechos reservados
            <br />
            Hecho con ❤️
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
