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

        <Card className='mb-3 FestUserCard'>
            <Row className='g-0'>
                <Col xs={12} md={4} className='d-flex align-items-center justify-content-center'>
                    <Link to={`/details/${_id}`}>
                        <Card.Img variant='top' src={imageUrl} />
                    </Link>
                </Col>
                <Col xs={12} md={8}>
                    <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
                        <Card.Title>{title}</Card.Title>
                        <div className='mt-3'>
                            <Link to={`/edit-fest/${_id}`}>
                                <Button variant='warning' className='w-100'>Edit Fest</Button>
                            </Link>
                        </div>
                        <div className='mt-3'>
                            <Link>
                                <Button variant='danger' className='w-100' onClick={handleDelete}>Eliminar</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default FestUSerCard