import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/HomePage.css';
import { Box, Container as ContainerM, Typography } from '@mui/material';
import Review from '../components/Review';

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`
const DATABASE_URL = 'http://localhost:4500';

const HomePage = () => {
  const [weather, setWeather] = useState({
    city: '',
    country: '',
    temp: "",
    condition: "",
    icon: "",
    conditionText: ""
  });

  const [vet, setVet] = useState([{ name: null }]);
  const reviews = [
    { avatar: 'https://static.vecteezy.com/system/resources/thumbnails/009/305/107/small/man-avatar-clipart-illustration-free-png.png', name: 'Cliente 1', rating: 3, comment: 'Buen servicio.', color: '#FFA726' },
    { avatar: 'https://static.vecteezy.com/system/resources/previews/009/397/835/non_2x/man-avatar-clipart-illustration-free-png.png', name: 'Cliente 2', rating: 5, comment: '¡Excelente!', color: '#42A5F5' },
    { avatar: 'https://static.vecteezy.com/system/resources/previews/019/495/202/non_2x/business-woman-girl-avatar-user-person-people-straight-hair-flat-style-vector.jpg', name: 'Cliente 3', rating: 4, comment: 'Muy satisfecho.', color: '#66BB6A' },
    { avatar: 'https://static.vecteezy.com/system/resources/previews/019/495/228/non_2x/woman-girl-avatar-user-person-long-hair-pink-clothing-flat-style-vector.jpg', name: 'Cliente 4', rating: 2, comment: 'Podría ser mejor.', color: '#FF7043' },
  ];

  const handleWeather = async () => {
    const response = await fetch(`${API_WEATHER}${"San Miguel de Tucuman"}`);
    const data = await response.json();
    if (data.error) throw { message: data.error.message };
    setWeather({
      city: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.code,
      icon: data.current.condition.icon,
      conditionText: data.current.condition.text
    });
  };

  const checkVet = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/veterinarians`, {
        method: 'GET'
      });
      const data = await response.json();
      setVet(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleWeather();
    checkVet();
  }, []);

  return (
    <>
      <Carousel data-bs-theme="light">
        <Carousel.Item>
          <img
            className="img"
            src='https://mir-s3-cdn-cf.behance.net/project_modules/1400/1b6b09201292311.6671e57c80844.jpg'
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item className='carousel-item'>
          <img
            className="img"
            src='https://cosycat.cl/cdn/shop/files/BANNER_c22abbe6-d131-4fb7-a644-a15fd9494886.png?v=1719354405&width=3840'
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item className='carousel-item'>
          <img
            className="img"
            alt="Third slide"
            src='https://www.increibles.com.uy/wp-content/uploads/2023/07/slide1-2-1.png'
          />
        </Carousel.Item>
      </Carousel>
      <Container fluid>
        <Row className="align-items-center">
          <Col md={2} className="weather-container">
            <ContainerM className='containerM' maxWidth='xs' sx={{ mt: 1, backgroundColor: '#B9D9EB', borderRadius: '8px' }}>
              {weather.city && (
                <Box sx={{ mt: 1, textAlign: 'center' }}>
                  <Box
                    component='img'
                    alt={weather.conditionText}
                    src={weather.icon}
                    sx={{ margin: '0 auto', width: '70px', height: '70px' }}
                  />
                  <Typography variant='h4' component='h2'>
                    {weather.temp} °C
                  </Typography>
                  <Typography variant='h6' component='h5'>
                    {weather.city}, {weather.country}
                  </Typography>
                  <Typography variant='body2' component='h5'>
                    {weather.conditionText}
                  </Typography>
                </Box>
              )}
            </ContainerM>
          </Col>
          <Col md={9} className="text-center mt-1">
            <h2 className="products text-center mb-4">Servicios que ofrecemos</h2>
            <Row className="justify-content-center">
              <Col md={3} className="mb-4">
                <Card className="h-100">
                  <Card.Img variant="top" src="https://img.freepik.com/foto-gratis/gato-perro-siendo-afectuosos-mostrando-amor-otro_23-2150984323.jpg?t=st=1719962876~exp=1719966476~hmac=f5ec968e457b7e93ce13a9c18d34e9216ae272187072e5f9c2495d3bad3e698e&w=740" />
                  <Card.Body>
                    <Card.Title as={Link} to='/plansPage'>Plan Primeros Pasos</Card.Title>
                    <Card.Text>
                      Servicios para mascotas de 0 a 5 años.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-4">
                <Card className="h-100">
                  <Card.Img variant="top" src="https://img.freepik.com/foto-gratis/gato-amor-siendo-afectuosos-otro_23-2150984551.jpg?t=st=1719962906~exp=1719966506~hmac=6bc94f4a51fbe3abee7e1529eea4d4f6435d2e4e0be7cd67fdd35ab8a3eb1517&w=740" />
                  <Card.Body>
                    <Card.Title as={Link} to='/plansPage'>Plan Madurando</Card.Title>
                    <Card.Text>
                      servicios para mascotas de 5 a 10 años.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-4">
                <Card className="h-100">
                  <Card.Img variant="top" src="https://img.freepik.com/foto-gratis/primer-plano-terrier-tibetano-gato-siberiano-aislado-pared-blanca_181624-38226.jpg?t=st=1719962959~exp=1719966559~hmac=a7dfbfd1dd06293774a384318bb8a38e060e16ab9c425d7d5ea1a2981f71207b&w=740" />
                  <Card.Body>
                    <Card.Title as={Link} to='/plansPage'>Plan Adultos</Card.Title>
                    <Card.Text>
                      Servicios para mascotas de más de 10 años.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="text-center mt-1">
        <h2 className=" text-center mb-4">Nuestros Profesionales</h2>
        <Row className="justify-content-center">
          {vet.map((item, index) => (
            <Col md={3} className="mb-4 text-center" key={index}>
              <div className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center mx-auto mt-3" style={{ width: '150px', height: '150px', backgroundColor: '#C3E6EC', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <img src="https://us.123rf.com/450wm/pshonka/pshonka2209/pshonka220900119/194044547-icono-aislado-del-vector-veterinario-signo-de-animales-de-compa%C3%B1%C3%ADa-s%C3%ADmbolo-gr%C3%A1fico-para-el-dise%C3%B1o.jpg?ver=6" alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </div>
              <p className="mt-2">{item.name}</p>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="mt-4">
        <h2 className="products text-center mb-4">PRODUCTOS DESTACADOS</h2>
        <Row className="justify-content-center">
          <Col md={3} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src="https://d23qt3x1ychzdy.cloudfront.net/dev_images_products/53d5db8f3ae26994b5fbf80d3c01ddda_1696439896.jpg" />
              <Card.Body>
                <Badge bg="success" className="mb-2">NUEVO</Badge>
                <Badge bg="info" className="mb-2">-10%</Badge>
                <Card.Title as={Link} to='/errorPage'>Arena Premium Furry Lavanda 7 KG</Card.Title>
                <Card.Text>
                  Presentación: Envase x 7 kg
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src="https://www.purina.com.ar/sites/default/files/styles/simple_card/public/2022-08/adult_pro_plan.png.webp?itok=LRbOLUgB" />
              <Card.Body>
                <Badge bg="info" className="mb-2">-10%</Badge>
                <Card.Title as={Link} to='/errorPage'>PURINA® PRO PLAN® ADULT</Card.Title>
                <Card.Text>
                  Este alimento está formulado para ofrecer vitalidad y protección a perros adultos de 1 a 7 años.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src="https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8719138813957_1.jpg" />
              <Card.Body>
                <Badge bg="info" className="mb-2">-10%</Badge>
                <Card.Title as={Link} to='/errorPage'>Juguete para perros cuerdas</Card.Title>
                <Card.Text>
                  Cuerdas Xl De 70+50cm Grandes Y Fuertes-nobleza
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src="https://i5.walmartimages.com.mx/mg/gm/1p/images/product-images/img_large/00750229052123l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" />
              <Card.Body>
                <Badge bg="info" className="mb-2">-10%</Badge>
                <Card.Title as={Link} to='/errorPage'>Casa Rascador para Gatos</Card.Title>
                <Card.Text>
                  Iglú Golden King 75 cm 2 en 1
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="mt-4">
        <h1 className="text-center mb-4">Reseñas de Clientes</h1>
        <Row>
          {reviews.map((review, index) => (
            <Col key={index} md={6} className="mb-4">
              <Review
                avatar={review.avatar}
                name={review.name}
                rating={review.rating}
                comment={review.comment}
                color={review.color}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
