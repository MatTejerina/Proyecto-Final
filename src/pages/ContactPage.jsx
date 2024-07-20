import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import { useSnackbar } from 'notistack';
import '../styles/ContactPage.css';

const serviceID = 'service_uk4txcr';
const templateID = 'template_2wivkev';
const userID = 'PmI8SU0Lj2hXogTSp';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correo: '',
    tel: '',
    consulta: ''
  });

  const [errors, setErrors] = useState({
    nombreCompleto: '',
    correo: '',
    tel: '',
    consulta: ''
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nombreCompleto') {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === 'tel') {
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombreCompleto) {
      newErrors.nombreCompleto = 'Nombre completo es requerido.';
    } else if (formData.nombreCompleto.length < 4 || formData.nombreCompleto.length > 32) {
      newErrors.nombreCompleto = 'El nombre debe tener entre 4 y 32 caracteres.';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.nombreCompleto)) {
      newErrors.nombreCompleto = 'El nombre solo puede contener letras y espacios.';
    }
    if (!formData.correo) {
      newErrors.correo = 'Correo electrónico es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'El correo electrónico no es válido.';
    }
    if (!formData.tel) {
      newErrors.tel = 'Teléfono es requerido.';
    } else if (!/^\d+$/.test(formData.tel)) {
      newErrors.tel = 'El teléfono solo puede contener números.';
    }
    if (!formData.consulta) {
      newErrors.consulta = 'Consulta es requerida.';
    } else if (formData.consulta.length < 10 || formData.consulta.length > 350) {
      newErrors.consulta = 'La consulta debe tener entre 10 y 350 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      emailjs.send(serviceID, templateID, formData, userID)
        .then((result) => {
          console.log('Email enviado:', result.text);
          enqueueSnackbar('Consulta enviada con éxito.', { variant: 'success' });
          setFormData({
            nombreCompleto: '',
            correo: '',
            tel: '',
            consulta: ''
          });
          setErrors({});
        })
        .catch((error) => {
          console.error('Error al enviar el email:', error);
          enqueueSnackbar('Error al enviar la consulta. Inténtelo de nuevo.', { variant: 'error' });
        });
    }
  };
  

  return (
    <div className="body-contact">
      <Container className="main-section">
        <Row>
          <Col xs={12} md={6}>
            <div className="rightSide">
              <div className="text-contact">
                <h2>¿En qué podemos ayudarte?</h2>
                <p>Deja tu consulta. Nos contactaremos a la brevedad:</p>
              </div>
              <div className="divForm-contact">
                <Form className="form-contact" onSubmit={handleSubmit}>
                  <Form.Group controlId="nombreCompleto">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombreCompleto"
                      placeholder="Ingrese su nombre completo"
                      value={formData.nombreCompleto}
                      onChange={handleChange}
                      isInvalid={!!errors.nombreCompleto}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nombreCompleto}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="correo">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      name="correo"
                      placeholder="Ingrese su correo electrónico"
                      value={formData.correo}
                      onChange={handleChange}
                      isInvalid={!!errors.correo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.correo}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="tel">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="tel"
                      name="tel"
                      placeholder="Ingrese su número de teléfono (ej: 398783652)"
                      value={formData.tel}
                      onChange={handleChange}
                      isInvalid={!!errors.tel}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.tel}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="consulta">
                    <Form.Label>Consulta (max. 350 caracteres)</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="consulta"
                      rows="4"
                      placeholder="Escriba su consulta"
                      value={formData.consulta}
                      onChange={handleChange}
                      isInvalid={!!errors.consulta}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.consulta}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="outline-danger" type="submit" className="btnContact mt-2">
                    Enviar
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
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
                <iframe className='mapa' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14241.424387574643!2d-65.209492!3d-26.828624!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c13f1ceb33d%3A0xbb344eb482b6ff14!2sGral.%20Jos%C3%A9%20de%20San%20Mart%C3%ADn%20839%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1720969682550!5m2!1ses-419!2sar" loading="lazy"></iframe>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;