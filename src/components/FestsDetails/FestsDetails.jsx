import { useEffect, useState, useContext } from "react"
import { Container, Button, Row, Col, Figure } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import festsServices from "../../services/fests.services"
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../contexts/auth.context'
import './FestsDetails.css'



const FestDetails = ({ fest, loadFestData }) => {


    const { fest_id } = useParams()

    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    const deleteFest = (fest_id) => {
        festsServices
            .deleteFest(fest_id)
            .then(() => {
                navigate('/fests')
            })
            .catch(err => console.log(err))
    }

    const [festData, setFestData] = useState({
        fans: ""
    })

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {

        festsServices
            .getDetails(fest_id)
            .then(({ data }) => {
                let { fans } = data
                setFestData({ fans })
                loadFestData()
            })

            .catch(err => console.error(err))
    }
    const handleJoinFest = () => {
        festsServices
            .joinFest(fest_id, festData)
            .then(({ data }) => {
                const { fans } = data
                setFestData({ fans })
                loadFestData()
            })
            .catch(err => console.log(err))
    }


    const handleLeaveFest = () => {
        festsServices
            .leaveFest(fest_id, festData)
            .then(({ data }) => {
                const { ...fans } = data
                setFestData({ fans })
                loadFestData()

            })
    }

    return (

        <Container>

            <h1 className="mb-4"> {fest.title} details</h1>
            <hr />
            <Row className="">
                <Col className="mb-5">
                    <Figure >
                        <Figure.Image className="festImage" src={fest.imageUrl} alt="fest image" />
                    </Figure>
                </Col>
                <Col>
                    <h4>{new Date(fest.startDate).toLocaleDateString()} | {new Date(fest.endDate).toLocaleDateString()}</h4>
                    <h5>Genre: {fest.genre}</h5>
                    <h5>Price: {fest.price} €</h5>
                    <p>{fest.description}</p>
                </Col>
            </Row >
            <Row>
                <Col >
                    <h5>Users joined:</h5>
                    {fest.fans?.map((elm, idx) => (
                        <Figure key={idx}>
                            <Link to={`/profile/${elm._id}`}>
                                <Figure.Image className="festAvatar" src={elm.avatar} alt={elm.username} />
                            </Link>
                        </Figure>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="buttonClass">
                        <Link to="">
                            <Button onClick={handleLeaveFest} as="span" variant="outline-dark"> Leave</Button>
                        </Link>
                    </div>
                    <div className="buttonClass">
                        <Link to="">
                            <Button onClick={handleJoinFest} as="span" variant="outline-dark"> Join</Button>
                        </Link>
                    </div>
                </Col>
            </Row>

            <Link to="/fests">
                <Button as="figure" variant="outline-dark">Back to All Fests</Button>
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

export default FestDetails
