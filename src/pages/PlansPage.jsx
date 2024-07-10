import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/PlansPage.css'; // Importa tus estilos CSS aquí

const serviceID = 'service_uk4txcr';
const templateID = 'template_2wivkev';
const userID = 'PmI8SU0Lj2hXogTSp';

const ConsultaPlan = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correo: '',
    tel: '',
    consulta: '',
    plan: '', // Campo para almacenar el plan seleccionado
    mascota: '', // Campo para el tipo de mascota (gato, perro, otro)
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      alert('Por favor ingrese un correo electrónico válido');
      return;
    }

    // Configurar los parámetros de la plantilla de EmailJS
    const templateParams = {
      to_email: formData.correo, // Aquí asignamos el correo electrónico del destinatario
      to_name: formData.nombreCompleto, // Esto es opcional si lo usas en tu plantilla
      plan: formData.plan, // Pasamos el plan seleccionado
      consulta: formData.consulta
    };

    console.log(templateParams);

    // Envío del formulario usando EmailJS
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('Correo enviado correctamente!', response.status, response.text);
        alert('Consulta enviada correctamente');
        setFormData({
          nombreCompleto: '',
          mascota: '',
          correo: '',
          tel: '',
          consulta: '',
          plan: '', // Limpiar el campo del plan después de enviar
        });
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
        alert('Hubo un error al enviar la consulta. Por favor intenta nuevamente más tarde.');
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="main-section">
      <div className="contenedor">
        {/* Formulario de consulta */}
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
              required
            >
              <option value="">Seleccionar Plan</option>
              <option value="primeros-pasos">Primeros Pasos</option>
              <option value="madurando">Madurando</option>
              <option value="adultos">Adultos</option>
            </select>

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
              minLength="4"
              maxLength="32"
              required
            />

            <input
              className="inputContacto"
              type="text"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              placeholder="Ingrese su nombre completo"
              minLength="4"
              maxLength="32"
              required
            />

            <input
              className="inputContacto"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ingrese su correo electrónico"
              minLength="10"
              maxLength="50"
              required
            />

            <input
              className="inputContacto"
              type="tel"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              placeholder="Ingrese su número de teléfono"
              minLength="12"
              maxLength="20"
              pattern="^\+\d{1,4}\d{1,10}$"
              required
            />

            <textarea
              className="inputContacto-consulta"
              name="consulta"
              value={formData.consulta}
              onChange={handleChange}
              placeholder="Escriba su consulta"
              minLength="10"
              maxLength="350"
              required
            ></textarea>

            <button type="submit" className="btnContacto btn-outline-primary btn">
              Enviar
            </button>
          </form>
        </div>

        {/* Aside con los planes */}
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