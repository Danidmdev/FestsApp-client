import { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {

    const { user, logout } = useContext(AuthContext)

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
                        {
                            user
                                ?
                                <>
                                    <Nav.Link as="span" onClick={logout}>Log out</Nav.Link>
                                </>
                                :
                                <>
                                    <Link to="/log-in">
                                        <Nav.Link as="span">Log in</Nav.Link>
                                    </Link>
                                    <Link to="/sign-up">
                                        <Nav.Link as="span">Sign up</Nav.Link>
                                    </Link>
                                </>
                        }
                    </Nav>
                    {user && <Navbar.Text>Bienvenid@, {user.username} | </Navbar.Text>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation