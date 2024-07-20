import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useSnackbar } from 'notistack';
import '../styles/PlansPage.css';

const serviceID = 'service_uk4txcr';
const templateID = 'template_2wivkev';
const userID = 'PmI8SU0Lj2hXogTSp';

const ConsultaPlan = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correo: '',
    tel: '',
    consulta: '',
    plan: '', 
    mascota: '',
  });

  const [errors, setErrors] = useState({
    nombreCompleto: '',
    correo: '',
    tel: '',
    consulta: '',
    plan: '',
    mascota: '',
  });

  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!/^[a-zA-Z\s]+$/.test(formData.nombreCompleto)) {
      errors.nombreCompleto = 'El nombre completo solo puede contener letras y espacios.';
      valid = false;
    }

    if (!/^\+\d{1,4}\d{1,10}$/.test(formData.tel)) {
      errors.tel = 'El número de teléfono debe estar en el formato +123456789.';
      valid = false;
    }

    if (formData.correo === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      errors.correo = 'Por favor ingrese un correo electrónico válido.';
      valid = false;
    }

    if (formData.consulta.length < 10) {
      errors.consulta = 'La consulta debe tener al menos 10 caracteres.';
      valid = false;
    }

    if (formData.plan === '') {
      errors.plan = 'Debe seleccionar un plan.';
      valid = false;
    }

    if (formData.mascota.length <= 3) {
      errors.mascota = 'El tipo de mascota debe tener al menos 3 caracteres.';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const templateParams = {
      to_email: formData.correo, 
      to_name: formData.nombreCompleto, 
      plan: formData.plan,
      consulta: formData.consulta
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('Correo enviado correctamente!', response.status, response.text);
        enqueueSnackbar('Consulta enviada correctamente', { variant: 'success' });
        setFormData({
          nombreCompleto: '',
          mascota: '',
          correo: '',
          tel: '',
          consulta: '',
          plan: '',
        });
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
        enqueueSnackbar('Error al enviar la consulta. Por favor intenta nuevamente más tarde.', { variant: 'error' });
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="main-section-planes">
      <div className="contenedor">
        <div className="form-container">
          <form className="form-contacto" onSubmit={handleSubmit}>
            <label htmlFor="plan" className="labelContacto">
              Seleccionar Plan
            </label>
            <select
              className="inputContacto"
              name="plan"
              value={formData.plan}
              onChange={handleChange}
            >
              <option value="">Seleccionar Plan</option>
              <option value="primeros-pasos">Primeros Pasos</option>
              <option value="madurando">Madurando</option>
              <option value="adultos">Adultos</option>
            </select>
            {errors.plan && <p className="error">{errors.plan}</p>}

            <label htmlFor="mascota" className="labelContacto">
              Tipo de mascota
            </label>
            <input
              className="inputContacto"
              type="text"
              name="mascota"
              value={formData.mascota}
              onChange={handleChange}
              placeholder="Ej. Gato, Perro, Otro"
              minLength="3"
              maxLength="32"
            />
            {errors.mascota && <p className="error">{errors.mascota}</p>}

            <input
              className="inputContacto"
              type="text"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              placeholder="Ingrese su nombre completo"
              minLength="4"
              maxLength="32"
            />
            {errors.nombreCompleto && <p className="error">{errors.nombreCompleto}</p>}

            <input
              className="inputContacto"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ingrese su correo electrónico"
              minLength="10"
              maxLength="50"
            />
            {errors.correo && <p className="error">{errors.correo}</p>}

            <input
              className="inputContacto"
              type="tel"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              placeholder="Ingrese su número de teléfono"
              minLength="8"
              maxLength="20"
              pattern="^\+\d{1,4}\d{1,10}$"
            />
            {errors.tel && <p className="error">{errors.tel}</p>}

            <textarea
              className="inputContacto-consulta"
              name="consulta"
              value={formData.consulta}
              onChange={handleChange}
              placeholder="Escriba su consulta"
              minLength="10"
              maxLength="350"
            ></textarea>
            {errors.consulta && <p className="error">{errors.consulta}</p>}

            <button type="submit" className="btnContacto btn-outline-primary btn">
              Enviar
            </button>
          </form>
        </div>

        <aside className="aside-container">
          <div className="plan-container">
            <div className="plan verde">
              <h3>Primeros Pasos</h3>
              <p>Servicios para mascotas de 0 a 5 años</p>
              <ul className='list-service'>
                <li>Chequeo veterinario anual</li>
                <li>Vacunas básicas</li>
                <li>Desparasitaciones</li>
                <li>Consulta de emergencia</li>
              </ul>
              <p className="precio">Precio: $30/mes</p>
            </div>
            <div className="plan azul">
              <h3>Madurando</h3>
              <p>Servicios para mascotas de 5 a 10 años</p>
              <ul className='list-service'>
                <li>Chequeo veterinario semestral</li>
                <li>Vacunas avanzadas</li>
                <li>Desparasitaciones</li>
                <li>Consulta de emergencia</li>
                <li>Análisis de sangre anual</li>
              </ul>
              <p className="precio">Precio: $50/mes</p>
            </div>
            <div className="plan rojo">
              <h3>Adultos</h3>
              <p>Servicios para mascotas de más de 10 años</p>
              <ul className='list-service'>
                <li>Chequeo veterinario trimestral</li>
                <li>Vacunas avanzadas</li>
                <li>Desparasitaciones</li>
                <li>Consulta de emergencia</li>
                <li>Análisis de sangre semestral</li>
                <li>Ecografía anual</li>
              </ul>
              <p className="precio">Precio: $70/mes</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ConsultaPlan;