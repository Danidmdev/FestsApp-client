import { useEffect, useState, useContext } from "react"
import { Container, Button, Row, Col } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import festsServices from "../../services/fests.services"
import { useNavigate } from "react-router-dom"
import { AuthContext } from './../../contexts/auth.context'
import './FestDetailsPage.css'


const FestDetailsPage = () => {

    const [fest, setFest] = useState({})

    const { fest_id } = useParams()

    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    useEffect(() => {
        festsServices
            .getDetails(fest_id)
            .then(({ data }) => {
                setFest(data)
            })

            .catch(err => console.error(err))
    }, [])

    const deleteFest = (fest_id) => {
        festsServices
            .deleteFest(fest_id)
            .then(() => {
                navigate('/fests')

            })
            .then(({ data }) => setFest(data))
            .catch(err => console.log(err))
    }

    return (

        <Container>

            <h1 className="mb-4"> {fest.title} details</h1>
            <hr />
            <Row>
                <Col md={6} className="mb-5">
                    <img src={fest.imageUrl} alt="fest image" />
                </Col>
                <Col md={6}>
                    <h4>{new Date(fest.startDate).toLocaleDateString()} | {new Date(fest.endDate).toLocaleDateString()}</h4>
                    <h5>Genre: {fest.genre}</h5>
                    <h5>Price: {fest.price}</h5>
                    <p>{fest.description}</p>
                </Col>
            </Row >

            <Link to="/fests">
                <Button as="figure" variant="dark">Back to All Fests</Button>
            </Link>
            <Link to={`/edit-fest/${fest_id}`}>
                {user._id === fest.owner && <Button as="figure" variant="warning">Edit Fest</Button>}
            </Link>
            <Link>
                {user._id === fest.owner && <Button as="figure" variant="danger" onClick={() => deleteFest(fest_id)}>Eliminar</Button>}
            </Link>

        </Container >
    )
}

export default FestDetailsPage