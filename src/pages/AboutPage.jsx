import React from 'react';
import '../styles/AboutPage.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const AboutPage = () => {
    return (
        <div className="about-page">
            <section className="acerca-de-grupal d-flex flex-column align-items-center">
                <div className="contenedor-objetos d-flex justify-content-center align-items-center">
                    <div className="texto d-flex flex-column align-items-end">
                        <h2>Grupo 2</h2>
                        <p>Somos un grupo de estudiantes de Rolling Code, apasionados por la tecnología y amantes de los animales, que nos encontramos presentando nuestro proyecto final sobre una veterinaria. Nuestro enfoque incluye no solo el desarrollo de la plataforma web para la gestión de la clínica veterinaria, sino también la implementación de un sistema de reserva de citas eficiente y fácil de usar. Nos esforzamos por combinar nuestro conocimiento en desarrollo web con nuestra pasión por mejorar la atención médica para mascotas, ofreciendo soluciones innovadoras y centradas en la experiencia del usuario.</p>
                    </div>
                </div>
                <div className="separador"></div>
            </section>

            <section className="acerca-de row justify-content-center align-items-center">
                <h2 className="staff mb-4 p-0 text-center">
                    <span className="vet">ROLLING-VET</span>
                    <span className="staff-2">STAFF</span>
                </h2>

                <div className="tarjeta col-xl-2 col-lg-3 col-md-4 col-sd-12 m-2">
                    <div className="containe">
                        <div className="card_1">
                            <div className="card_inner">
                                <div className="front agostina">
                                </div>
                                <div className="back">
                                    <h2><span className="nombre-tarjeta">Agostina</span> <br />Boga</h2>
                                    <p>Estudiante de <br /> <span className="descripcion">Rolling Code</span></p>
                                    <div className="social">
                                        <Link to="/errorPage"><FontAwesomeIcon icon={faFacebookSquare} className="icon" /></Link>
                                        <Link to="/errorPage"><FontAwesomeIcon icon={faInstagram} className="icon" /></Link>
                                        <Link to="/errorPage"><FontAwesomeIcon icon={faTwitter} className="icon" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tarjeta col-xl-2 col-lg-3 col-md-4 col-sd-12 m-2">
                    <div className="containe">
                        <div className="card_1">
                            <div className="card_inner">
                                <div className="front matias">
                                </div>
                                <div className="back">
                                    <h2><span className="nombre-tarjeta">Matias</span> <br />Tejerina</h2>
                                    <p>Estudiante de <br /> <span className="descripcion">Rolling Code</span></p>
                                    <div className="social">
                                        <Link to="/errorPage"><FontAwesomeIcon icon={faFacebookSquare} className="icon" /></Link>
                                        <Link to="/errorPage"><FontAwesomeIcon icon={faInstagram} className="icon" /></Link>
                                        <Link to="/errorPage"><FontAwesomeIcon icon={faTwitter} className="icon" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tarjeta col-xl-2 col-lg-3 col-md-4 col-sd-12 m-2">
                    <div className="containe">
                        <div className="card_1">
                            <div className="card_inner">
                                <div className="front tobias">
                                </div>
                                <div className="back">
                                    <h2><span className="nombre-tarjeta">Tobias</span> <br />Arias</h2>
                                    <p>Estudiante de <br /> <span className="descripcion">Rolling Code</span></p>
                                    <div className="social">
                                        <Link to="/errorPage"><FontAwesomeIcon icon={faFacebookSquare} className="icon" /></Link>
                                        <Link to="/errorPage"><FontAwesomeIcon icon={faInstagram} className="icon" /></Link>
                                        <Link to="/errorPage"><FontAwesomeIcon icon={faTwitter} className="icon" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;