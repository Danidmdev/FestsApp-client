import { Container, Button, Row, Col } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { Card, Accordion } from 'react-bootstrap'

// import { AuthContext } from './../../contexts/auth.context'
import './FestUserCard.css'

const FestUSerCard = ({ imageUrl, title, _id, description, genre, startDate, endDate, price, onDelete }) => {

    const { fest_id } = useParams()

    const handleDelete = () => {
        onDelete(fest_id)

    }

    return (

        <Card className='mb-3 FestUserCard d-flex flex-row' >
            <Card.Img className="mt-3 flex-column" variant="top" src={imageUrl} />
            <Card.Body className="flex-column">
                <div>
                    <Card.Title>{title}</Card.Title>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Description</Accordion.Header>
                            <Accordion.Body>
                                {description}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Genre</Accordion.Header>
                            <Accordion.Body>
                                {genre}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Date</Accordion.Header>
                            <Accordion.Body>
                                {new Date(startDate).toLocaleDateString()} | {new Date(endDate).toLocaleDateString()}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Price</Accordion.Header>
                            <Accordion.Body>
                                {price} €
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className="d-flex mt-1 flex-column align-self-center" >
                    <Link to={`/edit-fest/${_id}`}>
                        <Button as="figure" variant="warning" className="w-100">Edit Fest</Button>
                    </Link>
                    <Link>
                        <Button as="figure" variant="danger" className="w-100" onClick={handleDelete}>Eliminar</Button>
                    </Link>
                </div>
            </Card.Body>
        </Card >
    )
}

export default FestUSerCard