// components/Footer.jsx

import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer text-center">
      <div className="container text-light text-center">
        <div className="content-footer">
          <div className="container-redes">
            <div className="container-redes-sociales">
              <ul>
                <li>
                  <a
                    className="links"
                    href="*"
                  >
                    <i className="fab fa-facebook-square icon"></i>
                    <span className="d-none d-md-inline">
                      RollingCode
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="links"
                    href="*"
                  >
                    <i className="fab fa-instagram icon"></i>
                    <span className="d-none d-md-inline">
                      @rollingcodeschool
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="links"
                    href="*"
                  >
                    <i className="fa-brands fa-square-x-twitter"></i>
                    <span className="d-none d-md-inline">
                      @rollingcodeok
                    </span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="container-about">
              <div className="linea">
                <a href="/*" className="paginas col">
                  Inicio
                </a>
              </div>
              <div className="linea">
                <a
                  href="/*"
                  className="paginas col"
                >
                  Noticias
                </a>
              </div>
              <div className="linea">
                <a
                  href="/*"
                  className="paginas col"
                >
                  Sobre Nosotros
                </a>
              </div>
              <div className="linea">
                <a
                  href="/*"
                  className="paginas col"
                >
                  Contáctanos
                </a>
              </div>
            </div>
            <div className="logo">
              <a className="text-light" href="../index.html">
                Rolling<span className="titulo-pagina">Vet</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="copy">
        <p className="m-0 p-0 text-secondary">
          <small>&copy; 2024 Todos los derechos reservados</small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;