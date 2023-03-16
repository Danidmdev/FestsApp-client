import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const HomePage = () => {

    return (
        <Container className="Home">

            <Row>

                <Col >

                    <h1>Fest App</h1>
                    <hr />
                    <p>Home page de prueba esto no es un lab!!!</p>
                    <Link to="/fests">
                        <Button variant="dark">See all fests </Button>
                    </Link>

                </Col>

            </Row>

        </Container>
    )
}

export default HomePage