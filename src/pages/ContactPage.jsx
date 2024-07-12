import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { enqueueSnackbar } from 'notistack';
import '../styles/LoginPage.css'; // Importa los estilos del LoginPage.css

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
    <div className="container mt-2">
      <h2 className='introText fs-1'>Contacto</h2>
      <p className="introText mb-4">¿Tienes alguna pregunta o comentario? Utiliza el formulario a continuación para ponerte en contacto con nosotros. Estaremos encantados de escucharte y responder lo antes posible.</p>
      <Form className="loginForm" onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Nombre y Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre y Apellido"
            {...register('name', { required: 'Este campo es obligatorio' })}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type='invalid'>{errors.name?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@google.com"
            {...register('email', { required: 'Este campo es obligatorio' })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicComment">
          <Form.Label>Comentario</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Escribe tu comentario aquí..."
            {...register('comment', { required: 'Este campo es obligatorio' })}
            isInvalid={!!errors.comment}
          />
          <Form.Control.Feedback type='invalid'>{errors.comment?.message}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading} className='mt-2'>
          {isLoading ? 'Enviando...' : 'Enviar Comentario'}
        </Button>
      </Form>
    </div>
  );
};

export default ContactPage;
