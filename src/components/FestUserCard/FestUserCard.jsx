import { Button, Row, Col } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import { Card } from 'react-bootstrap'
import { useContext } from "react"
import { AuthContext } from './../../contexts/auth.context'
import './FestUserCard.css'

const FestUSerCard = ({ imageUrl, title, _id, owner, onDelete }) => {

    const { fest_id } = useParams()


    const { user } = useContext(AuthContext)

    const handleDelete = () => {
        onDelete(fest_id)
    }

    return (

        <Card className='mb-3 FestUserCard'>
            <Row className='g-0'>
                <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
                    <Card.Title>{title}</Card.Title>
                    <Link to={`/details/${_id}`}>
                        <Card.Img variant='top' src={imageUrl} />
                    </Link>
                    <Col>
                        <div className='mt-3 buttonClass'>
                            <Link to={`/edit-fest/${_id}`}>
                                {(user._id === owner || user.role === 'ADMIN') && <Button variant='outline-warning' className='w-100'>Edit Fest</Button>}
                            </Link>
                        </div>
                        <div className='mt-3 buttonClass'>
                            <Link>
                                {(user._id === owner || user.role === 'ADMIN') && <Button variant='outline-danger' className='w-100' onClick={handleDelete}>Eliminar</Button>}
                            </Link>
                        </div>
                    </Col>
                </Card.Body>
            </Row>
        </Card >
    )
}

export default FestUSerCard