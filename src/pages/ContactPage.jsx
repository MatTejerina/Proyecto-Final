<<<<<<< HEAD
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import '../styles/ContactPage.css';
=======
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/ContactPage.css';

>>>>>>> 4e46950d8d4d5cc2861aea2e3f9244ef38cd16c7

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Aquí enviarías el comentario por correo electrónico al administrador
      // Podrías usar una API o servicio para enviar el correo electrónico
      
      // Ejemplo simplificado de enviar un mensaje a consola
      console.log('Comentario enviado:', data);
      
      enqueueSnackbar('Comentario enviado correctamente', { variant: 'success' });
      reset(); // Limpiar el formulario después del envío exitoso
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
      enqueueSnackbar('Error al enviar el comentario', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="body-contact">
      <Container className="main-section">
        <Row>
          <Col >
            <div className="rightSide">
              <div className="text-contact">
                <h2>¿En qué podemos ayudarte?</h2>
                <p>Deja tu consulta. Nos contactaremos a la brevedad:</p>
              </div>
              <div className="divForm-contact">
                <Form className="form-contact">
                  <Form.Group controlId="nombreCompleto">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombreCompleto"
                      placeholder="Ingrese su nombre completo"
                      minLength="4"
                      maxLength="32"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="correo">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      name="correo"
                      placeholder="Ingrese su correo electrónico"
                      minLength="10"
                      maxLength="50"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="tel">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="tel"
                      name="tel"
                      placeholder="Ingrese su número de teléfono (ej: +543812345)"
                      minLength="12"
                      maxLength="20"
                      pattern="^\+\d{1,4}\d{1,10}$"
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="consulta">
                    <Form.Label>Consulta (max. 350 caracteres)</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="consulta"
                      rows="4"
                      placeholder="Escriba su consulta"
                      minLength="10"
                      maxLength="350"
                      required
                    />
                  </Form.Group>
                  <Button variant="outline-danger" type="submit" className="btnContact mt-2">
                    Enviar
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
          <Col >
            <div className="leftSide">
              <div className="element-contact small-element-contact">
                <div className="logo-infoContact">
                  <i className="fa fa-phone"></i>
                </div>
                <div className="text-infoContact">
                  <h3>Teléfono</h3>
                  <p>+54 9 398-783652</p>
                </div>
              </div>
              <div className="element-contact small-element-contact">
                <div className="logo-infoContact">
                  <i className="fa fa-envelope"></i>
                </div>
                <div className="text-infoContact">
                  <h3>Email</h3>
                  <p>rollingVet@gmail.com</p>
                </div>
              </div>
              <div className="content large-content mt-4">
                <div className="text-map">
                  <h4>¿Dónde encontrarnos?</h4>
                  <h6>Gral. José de San Martín 839</h6>
                </div>
                <iframe className='mapa' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14241.424387574643!2d-65.209492!3d-26.828624!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c13f1ceb33d%3A0xbb344eb482b6ff14!2sGral.%20Jos%C3%A9%20de%20San%20Mart%C3%ADn%20839%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1720969682550!5m2!1ses-419!2sar" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;
<<<<<<< HEAD

=======
>>>>>>> 4e46950d8d4d5cc2861aea2e3f9244ef38cd16c7
