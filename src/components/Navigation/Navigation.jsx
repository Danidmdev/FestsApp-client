import { useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {

    const { user, logout } = useContext(AuthContext)

    return (
        <Navbar bg="dark" variant='dark' expand="lg">
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
                        <Link to="/calendar">
                            <Nav.Link as="span">Calendar</Nav.Link>
                        </Link>
                        <Link to="/map">
                            <Nav.Link as="span">Map</Nav.Link>
                        </Link>
                        <Link to="/allUsers">
                            <Nav.Link as="span">All Users</Nav.Link>
                        </Link>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="User"
                            menuVariant="dark"
                            className='align-end'
                        >
                            {
                                user
                                    ?
                                    <>
                                        <NavDropdown.Item>
                                            <Link to={`/profile/${user._id}`}>
                                                <Nav.Link as="span">Profile</Nav.Link>
                                            </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Nav.Link as="span" onClick={logout}>Log out</Nav.Link>
                                        </NavDropdown.Item>
                                    </>
                                    :
                                    <>
                                        <NavDropdown.Item>
                                            <Link to="/log-in">
                                                <Nav.Link as="span">Log in</Nav.Link>
                                            </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <Link to="/sign-up">
                                                <Nav.Link as="span">Sign up</Nav.Link>
                                            </Link>
                                        </NavDropdown.Item>
                                    </>
                            }
                        </NavDropdown>
                    </Nav>
                    {user && <Navbar.Text>Bienvenid@, {user.username} | </Navbar.Text>}
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Navigation