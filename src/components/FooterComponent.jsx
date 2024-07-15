import { Link } from 'react-router-dom';
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
                <Link to='/homePage' className="paginas col">
                  Inicio
                </Link>
              </div>
              <div className="linea">
                <Link to='/errorPage'
                  className="paginas col"
                >
                  Noticias
                </Link>
              </div>
              <div className="linea">
                <Link to='/aboutPage'
                  className="paginas col"
                >
                  Sobre Nosotros
                </Link>
              </div>
              <div className="linea">
                <Link to='/contactPage'
                  className="paginas col"
                >
                  Contáctanos
                </Link>
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