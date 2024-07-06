import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/Home.css'
import { Box, Container as ContainerM, TextField, Typography } from '@mui/material'

const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`

const HomePage = () => {
  const [weather, setWeather] = useState(
    {
      city: '',
      country: '',
      temp: "",
      condition: "",
      icon: "",
      conditionText: ""
    });
  let [vet, setVet] = useState([{ name: null }])
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
  }
  const checkVet = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/veterinarians', {
        method: 'GET'
      });
      const data = await response.json();
      setVet(data)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    handleWeather();
    checkVet();
  }, []);

  return (
    <>
      <Carousel data-bs-theme=" dark ">
        <Carousel.Item>
          <img
            className="img"
            src='https://scontent.faep6-1.fna.fbcdn.net/v/t39.30808-6/352209316_2172792026248079_8227842120629782214_n.jpg?stp=dst-jpg_p180x540&_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=qxly1gYvgqsQ7kNvgFIte8J&_nc_ht=scontent.faep6-1.fna&oh=00_AYDEirD8UvEPuOp2PHuLwUpg3m52Mo_8-oL7dm5BpbVvEA&oe=668A63A6'
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
                    sx={{ margin: '0 auto', width: '70px', height: '70px' }} // Ajusta el tamaño del icono según necesites
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
          <Col md={9} className=" text-center mt-1">
            <h2 className=" products text-center mb-4">Servicios que ofrecemos</h2>
            <Row className="justify-content-center">
              <Col md={3} className="mb-4">
                <Card className="h-100" as={Link} to='/plans'>
                  <Card.Img variant="top" src="https://img.freepik.com/foto-gratis/gato-perro-siendo-afectuosos-mostrando-amor-otro_23-2150984323.jpg?t=st=1719962876~exp=1719966476~hmac=f5ec968e457b7e93ce13a9c18d34e9216ae272187072e5f9c2495d3bad3e698e&w=740" />
                  <Card.Body>
                    <Card.Title as={Link} to='/plans'>Plan Primeros Pasos</Card.Title>
                    <Card.Text>
                      Servicios para mascotas de 0 a 5 años.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-4" >
                <Card className="h-100" as={Link} to='/plans' >
                  <Card.Img variant="top" src="https://img.freepik.com/foto-gratis/gato-amor-siendo-afectuosos-otro_23-2150984551.jpg?t=st=1719962906~exp=1719966506~hmac=6bc94f4a51fbe3abee7e1529eea4d4f6435d2e4e0be7cd67fdd35ab8a3eb1517&w=740" />
                  <Card.Body>
                    <Card.Title as={Link} to='/plans'>Plan Madurando</Card.Title>
                    <Card.Text>
                      servicios para mascotas de 5 a 10 años.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3} className="mb-4">
                <Card className="h-100" as={Link} to='/plans'>
                  <Card.Img variant="top" src="https://img.freepik.com/foto-gratis/primer-plano-terrier-tibetano-gato-siberiano-aislado-pared-blanca_181624-38226.jpg?t=st=1719962959~exp=1719966559~hmac=a7dfbfd1dd06293774a384318bb8a38e060e16ab9c425d7d5ea1a2981f71207b&w=740" />
                  <Card.Body>
                    <Card.Title as={Link} to='/plans'>Plan Adultos</Card.Title>
                    <Card.Text >
                      Servicios para mascotas de más de 10 años.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className=" text-center mt-1">
        <h2 className=" products text-center mb-4">Nuestros Profesionales</h2>
        <Row className="justify-content-center">
          {vet.map((item, index) => (
            <Col md={3} className="mb-4" key={index}>
              <Card className="h-100">
                <Card.Img variant="top" src="https://us.123rf.com/450wm/pshonka/pshonka2209/pshonka220900119/194044547-icono-aislado-del-vector-veterinario-signo-de-animales-de-compa%C3%B1%C3%ADa-s%C3%ADmbolo-gr%C3%A1fico-para-el-dise%C3%B1o.jpg?ver=6" />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="mt-4">
        <h2 className=" products text-center mb-4">PRODUCTOS DESTACADOS</h2>
        <Row className="justify-content-center">
          <Col md={3} className="mb-4">
            <Card className="h-100" as={Link} to='/404'>
              <Card.Img variant="top" src="https://d23qt3x1ychzdy.cloudfront.net/dev_images_products/53d5db8f3ae26994b5fbf80d3c01ddda_1696439896.jpg" />
              <Card.Body>
                <Badge bg="success" className="mb-2">NUEVO</Badge>
                <Badge bg="info" className="mb-2">-10%</Badge>
                <Card.Title as={Link} to='/404'>Arena Premium Furry Lavanda 7 KG</Card.Title>
                <Card.Text>
                  Presentación: Envase x 7 kg
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100" as={Link} to='/404'>
              <Card.Img variant="top" src="https://www.purina.com.ar/sites/default/files/styles/simple_card/public/2022-08/adult_pro_plan.png.webp?itok=LRbOLUgB" />
              <Card.Body>
                <Badge bg="info" className="mb-2">-10%</Badge>
                <Card.Title className='card-title' as={Link} to='/error'>PURINA® PRO PLAN® ADULT</Card.Title>
                <Card.Text>
                  Este alimento está formulado para ofrecer vitalidad y protección a perros adultos de 1 a 7 años.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100" as={Link} to='/404'>
              <Card.Img variant="top" src="https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/8719138813957_1.jpg" />
              <Card.Body>
                <Badge bg="info" className="mb-2">-10%</Badge>
                <Card.Title className='card-title' as={Link} to='/404'>Juguete para perros cuerdas </Card.Title>
                <Card.Text>

                  Cuerdas Xl De 70+50cm Grandes Y Fuertes-nobleza
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="h-100" as={Link} to='/404'>
              <Card.Img variant="top" src="https://i5.walmartimages.com.mx/mg/gm/1p/images/product-images/img_large/00750229052123l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF" />
              <Card.Body>
                <Badge bg="info" className="mb-2">-10%</Badge>
                <Card.Title className='card-title' as={Link} to='/404'>Casa Rascador para Gatos </Card.Title>
                <Card.Text>
                  Iglú Golden King 75 cm 2 en 1
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container >
    </>
  );
};

export default HomePage;