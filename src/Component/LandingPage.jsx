import React from 'react'
import {
  Container,
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  Image,
  Card
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import Footer from './Footer'

const LandingPage = () => {
  const nav = useNavigate()
  const teamMembers = [
    {
      image: '/images/awais.jpg', // Replace with actual image paths

      name: 'Awais Qamar',
      role: 'Software Engineer',
      summary:
        'Awais is specialized in creating full stack applications using MERN Stack.'
    },
    {
      image: '/images/hassan.jpg', // Replace with actual image paths
      name: 'Hassan Subhani',
      role: 'Software Engineer',
      summary:
        'Hassan is a professional software engineer who uses software engineering methods for software development.'
    },
    {
      image: '/images/farooq.jpg', // Replace with actual image paths

      name: 'Farooq Azam',
      role: 'Software Engineer',

      summary:
        'Farooq is a professional software engineer who uses software engineering methods for software development.'
    },

    {
      image:
        'https://media.licdn.com/dms/image/C4D03AQE-t-XLkflSPQ/profile-displayphoto-shrink_800_800/0/1516622494044?e=1724889600&v=beta&t=nZiNsjRvi703XH6fqvBkH6Xx21ljF4L44XG4S7WM8Tg',
      name: 'Abdullah Yousafzai',
      role: 'Advisor / Mentor',
      summary:
        'Abdullah Yousafzai is an experienced advisor and mentor, providing valuable guidance and support to teams, ensuring strategic growth and development.'
    }
  ]
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <>
      <Navbar
        collapseOnSelect
        expand='lg'
        className='bg-body-tertiary'
        style={{ position: 'sticky', top: 0, zIndex: 1000 }}
      >
        <Container>
          <Navbar.Brand>BillboardEase</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#intro'>About</Nav.Link>
              <Nav.Link href='#our-services'>Our Services</Nav.Link>
              {/* team
               */}
              <Nav.Link href='#team'>Team</Nav.Link>

              {/* Uncomment or add more Nav.Link or NavDropdown here as needed */}
            </Nav>
            <Nav>
              <Nav.Link
                as={Button}
                className='me-3'
                onClick={() => {
                  nav('/login')
                }}
              >
                Login/Signup
              </Nav.Link>
              {/* <Nav.Link href='#login' as={Button}>
                Login/Signup
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Additional sections below the navbar */}

      <section
        id='intro'
        style={{
          backgroundColor: '#001f3f',
          color: 'white',
          padding: '50px 0',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container>
          <Row>
            <Col md={6}>
              <h1>Boost Your Reach with BillboardEase</h1>
              <p>
                With BillboardEase's billboard advertising platform, you can
                manage and optimize your advertising campaigns effectively.
                Reach more customers and enhance your brand visibility.
              </p>
              <Button
                variant='primary'
                // href='#features'
                onClick={() => {
                  nav('/advertise')
                }}
              >
                Start advertising for free
              </Button>
            </Col>
            <Col md={6}>
              <Image src='/images/billlboard1.webp' alt='BillboardEase' fluid />
            </Col>
          </Row>
        </Container>
      </section>
      {/* <section id='scale-campaigns' className='mt-4'>
        <Container>
          <h2 className='text-center'>
            Scale campaigns and conversions with ease
          </h2>
          <p className='text-center'>
            BillboardEase helps businesses turn millions of views into leads,
            sales, and signups. Our platform has every tool, template, and
            resource you need to build high-converting campaigns and optimize
            from every angle.
          </p>
          <Row className='text-center mt-4'>
            <Col md={4}>
              <Image
                src='create-more-landing-pages-faster.png'
                alt='Create more landing pages faster'
                fluid
              />
              <h3>Create more campaigns faster</h3>
              <p>
                Use our drag-and-drop builder to create custom campaigns for
                desktop and mobile without writing a single line of code.
              </p>
            </Col>
            <Col md={4}>
              <Image
                src='ab-test.png'
                alt='A/B test for more conversions'
                fluid
              />
              <h3>A/B test for more conversions</h3>
              <p>
                Use our A/B testing tool to validate your ideas, optimize your
                marketing, and find the ad variants that convert best.
              </p>
            </Col>
            <Col md={4}>
              <Image
                src='optimize-with-ai.png'
                alt='Instantly optimize with AI'
                fluid
              />
              <h3>Instantly optimize with AI</h3>
              <p>
                Use AI optimization to automatically send your ads to the
                audiences where they’re most likely to convert and get an
                average of 30% more conversions.
              </p>
            </Col>
          </Row>
        </Container>
      </section> */}
      <section id='our-services'>
        <Container className='my-5'>
          <Row className='text-center'>
            <Col>
              <h2 className='my-4'>Our Services</h2>
              <p>
                BillboardEase provides an all-in-one solution for managing and
                securing billboard advertising spaces. Our platform features an
                innovative online bidding system, secure payment processing
                through Stripe, and real-time updates via WebSockets. We ensure
                a seamless and efficient experience for advertisers and
                administrators alike.
              </p>
            </Col>
          </Row>
          {/* <Row>
            <Col md={6} className='mb-4'>
              <Card>
                <Card.Img
                  variant='top'
                  src='/images/i1.webp'
                  alt='Cityscape 1'
                />
              </Card>
            </Col>
            <Col md={6} className='mb-4'>
              <Card>
                <Card.Img
                  variant='top'
                  src='/images/i2.webp'
                  alt='Cityscape 2'
                />
              </Card>
            </Col>
          </Row> */}
          <Row className='align-items-center'>
            <Col md={6} className='mb-4'>
              <Card>
                <Card.Img
                  variant='top'
                  src='/images/i3.webp'
                  alt='Technology Image'
                />
              </Card>
            </Col>
            <Col md={6} className='text-center'>
              <h3>Order Advertisement</h3>
              <p>
                Easily place and manage your billboard advertisements through
                our intuitive platform. Utilize our real-time bidding system to
                secure prime locations, and handle payments seamlessly with
                Stripe integration. Maximize your advertising impact with
                BillboardEase.
              </p>
            </Col>
          </Row>
          <Row className='align-items-center'>
            <Col md={6} className='text-center'>
              <h3>Advertisement Management</h3>
              <p>
                Streamline your advertisement management with BillboardEase. Our
                platform allows you to easily organize, schedule, and track your
                billboard ads. With real-time updates and comprehensive
                analytics, you can optimize your campaigns for maximum
                effectiveness. Manage all your advertisements in one convenient
                location.
              </p>
            </Col>
            <Col md={6} className='mb-4'>
              <Card>
                <Card.Img
                  variant='top'
                  src='/images/i2.webp'
                  alt='Technology Image'
                />
              </Card>
            </Col>
          </Row>
          <Row className='align-items-center'>
            <Col md={6} className='mb-4'>
              <Card>
                <Card.Img
                  variant='top'
                  src='/images/i1.webp'
                  alt='Technology Image'
                />
              </Card>
            </Col>
            <Col md={6} className='text-center'>
              <h3>Bidding System</h3>
              <p>
                Experience the efficiency of BillboardEase's advanced bidding
                system. Our platform enables real-time bidding for billboard
                spaces, ensuring you get the best locations at competitive
                prices. With instant updates and notifications, you can stay
                ahead in securing prime advertising spots effortlessly.
              </p>
            </Col>
          </Row>
          {/* <Row className='text-center'>
            <Col>
              <h2 className='my-4'>Evaluationizing Billboards</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type.
              </p>
            </Col>
          </Row> */}
          {/* <Row>
            <Col className='mb-4'>
              <Card>
                <Card.Img
                  variant='top'
                  src='/path/to/your/image4.jpg'
                  alt='Billboards'
                />
              </Card>
            </Col>
          </Row> */}
        </Container>
      </section>
      <section id='team'>
        <Container className='my-5'>
          <h2 className='text-center my-4'>Our Team</h2>
          <Slider {...settings}>
            {teamMembers.map((member, index) => (
              <div key={index}>
                <Card className='mx-3'>
                  <Card.Img
                    variant='top'
                    src={member.image}
                    alt={member.name}
                    className='m-3'
                    style={{
                      width: '300px',
                      height: '300px',
                      objectFit: 'cover'
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{member.name}</Card.Title>
                    <Card.Subtitle className='mb-2 text-muted'>
                      {member.role}
                    </Card.Subtitle>
                    <Card.Text>{member.summary}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Slider>
        </Container>
      </section>
      <Footer />
    </>
  )
}

export default LandingPage
