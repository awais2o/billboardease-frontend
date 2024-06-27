import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Footer = () => {
  return (
    <footer
      className='mt-3'
      style={{ backgroundColor: '#001f3f', color: 'white', padding: '20px 0' }}
    >
      <Container>
        <Row>
          <Col md={4}>
            <h5>Stakeholders</h5>
            <ul className='list-unstyled'>
              <li className='mt-1'>
                <a
                  href='https://www.linkedin.com/in/abdullahyousafzai/'
                  style={{ color: 'white' }}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    src='https://media.licdn.com/dms/image/C4D03AQE-t-XLkflSPQ/profile-displayphoto-shrink_800_800/0/1516622494044?e=1724889600&v=beta&t=nZiNsjRvi703XH6fqvBkH6Xx21ljF4L44XG4S7WM8Tg'
                    roundedCircle
                    style={{ width: '40px', marginRight: '10px' }}
                  />
                  Dr. Abdulllah Yousafzai - Advisor
                </a>
              </li>
              <li className='mt-1'>
                <a
                  href='https://linkedin.com/in/awaisqamardev'
                  style={{ color: 'white' }}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    src='https://media.licdn.com/dms/image/D4D03AQFpEe-dW3AdcQ/profile-displayphoto-shrink_400_400/0/1695453780862?e=1724889600&v=beta&t=Srx2h8uM3Q_CEt-bFeHRF7TzOt_agvkcFq0M8dtoPkM'
                    roundedCircle
                    style={{ width: '40px', marginRight: '10px' }}
                  />
                  Awais Qamar - Software Engineer
                </a>
              </li>
              <li className='mt-1'>
                <a
                  href='https://www.linkedin.com/in/mhassansubhani/'
                  style={{ color: 'white' }}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    src='https://media.licdn.com/dms/image/D4D03AQHFwd3znDJRrQ/profile-displayphoto-shrink_400_400/0/1709938314304?e=1724889600&v=beta&t=azKZ3V-HVdlssvZjEMoEi6R9xfy9v-zzwidU_M4IkcM'
                    roundedCircle
                    style={{ width: '40px', marginRight: '10px' }}
                  />
                  Hassan Subhani - Software Engineer
                </a>
              </li>
              <li className='mt-1'>
                <a
                  href='https://www.linkedin.com/in/muhammad-farooq-azam-rasheed-334736270/'
                  style={{ color: 'white' }}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    src='https://media.licdn.com/dms/image/D4D03AQE98aTTqDgnCg/profile-displayphoto-shrink_400_400/0/1685370682054?e=1724889600&v=beta&t=USNhD2dJLI18alEXgpu7ctBdsQM8JnkdF1Hm5ZwmqRk'
                    roundedCircle
                    style={{ width: '40px', marginRight: '10px' }}
                  />
                  Farooq Azam - Software Engineer
                </a>
              </li>
              {/* Add more stakeholders as needed */}
            </ul>
          </Col>
          <Col md={4}>
            <h5>About BillboardEase</h5>
            <p>
              BillboardEase is your one-stop solution for all billboard
              advertising needs. We offer a platform where advertisers can
              easily find and bid on billboard spaces.
            </p>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: awaisqamar157@gmail.com</p>
            <p>Phone: +92 302 886 1009</p>
            <p>
              Avenue 1 Khayaban-e-Jinnah, Pir Mansur Johar Town, Lahore, Punjab
            </p>
          </Col>
        </Row>
        <Row className='text-center mt-3'>
          <Col>
            <p>
              &copy; {new Date().getFullYear()} BillboardEase. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
