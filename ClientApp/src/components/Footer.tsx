import React from "react";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { scrollToTop } from "./scrollToTop";

function Footer() {

  return (
    <div>
      <div className="container my-5">
        <footer className="text-center text-black">
          <div className="container">
            <section className="mt-5">
              <div className="row text-center d-flex justify-content-center pt-5">
                <div className="col-md-2">
                  <h6 className="text-uppercase font-weight-bold">
                    <NavLink
                      tag={Link}
                      onClick={scrollToTop}
                      className="text-decoration-underline"
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
                      className="text-decoration-underline"
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
                      className="text-decoration-underline"
                      to={"/contact"}
                    >
                      Contacto
                    </NavLink>
                  </h6>
                </div>
              </div>
            </section>

            <hr className="my-5" />
          </div>

          <div className="text-center p-3 style1">
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
