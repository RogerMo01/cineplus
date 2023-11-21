import React from "react";

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
                                        <a href="#!" className="text-black">Sobre nosotros</a>
                                    </h6>
                                </div>

                                <div className="col-md-2">
                                    <h6 className="text-uppercase font-weight-bold">
                                        <a href="#!" className="text-black">Películas</a>
                                    </h6>
                                </div>

                                <div className="col-md-2">
                                    <h6 className="text-uppercase font-weight-bold">
                                        <a href="#!" className="text-black">Contacto</a>
                                    </h6>
                                </div>
                            </div>
                        </section>

                        <hr className="my-5" />

                    </div>

                    <div className="text-center p-3 style1">
                        © 2023 Todos los derechos reservados<br/>
                        Hecho con ❤️
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Footer;