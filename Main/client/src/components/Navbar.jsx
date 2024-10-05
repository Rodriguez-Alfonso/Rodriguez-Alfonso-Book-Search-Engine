import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

const AuthModal = ({ show, handleClose }) => (
  <Modal
    size='lg'
    show={show}
    onHide={handleClose}
    aria-labelledby='signup-modal'>
    <Tab.Container defaultActiveKey='login'>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title id='signup-modal'>
          <Nav variant='tabs'>
            <Nav.Item>
              <Nav.Link eventKey='login' className="text-white">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='signup' className="text-white">Sign Up</Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Content>
          <Tab.Pane eventKey='login'>
            <LoginForm handleModalClose={handleClose} />
          </Tab.Pane>
          <Tab.Pane eventKey='signup'>
            <SignUpForm handleModalClose={handleClose} />
          </Tab.Pane>
        </Tab.Content>
      </Modal.Body>
    </Tab.Container>
  </Modal>
);

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar expand='lg' className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to='/'>
            Google Books Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='justify-content-end'>
            <Nav>
              <Nav.Link as={Link} to='/'>
                Search For Books
              </Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    See Your Books
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AuthModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default AppNavbar;
