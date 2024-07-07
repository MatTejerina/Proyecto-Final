import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/LoginPage.css'

const LoginPage = ({ setUser }) => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': ' application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.status !== 200) {
      const error = await response.json();
      enqueueSnackbar(error.message, { variant: 'error' })
    }
    const loginData = await response.json();
    const decoded = jwtDecode(loginData.accessToken);
    localStorage.setItem('isUserLogged', true);
    localStorage.setItem('token', loginData.accessToken);

    setUser({
      token: loginData.accessToken,
      userInfo: decoded.fullName,
      logged: true,
      isAdmin: loginData.isAdmin
    })

    window.location.href = '/homePage'
  };


  return (
    <>
      <Form className='loginForm' onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Form.Group className="mb-2" controlId="Form.Controlemail">
          <Form.Label>Direccion de Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@google.com"
            autoFocus
            {...register('email', { required: 'Este campo es obligatorio' })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Form.Controlpassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="*******"
            {...register('password', { required: 'Este campo es obligatorio' })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type='invalid'>{errors.password?.message}</Form.Control.Feedback>

        </Form.Group>
        <Button variant="primary" type='submit'>
          Iniciar Sesion
        </Button>
        <p className='text-dark m-0'>No tienes una cuenta? <Link to='/register'> Registrarse</Link></p>
      </Form>
    </>
  );
}

export default LoginPage;