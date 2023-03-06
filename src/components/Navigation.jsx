import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {

    return (
        <Navbar bg="dark" variant='dark' expand="md">
            <Container>
                <Link to="/">
                    <Navbar.Brand as="span">Fests-App</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/fests">
                            <Nav.Link as="span">Fests</Nav.Link>
                        </Link>
                        <Link to="/create">
                            <Nav.Link as="span">New Fest</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation