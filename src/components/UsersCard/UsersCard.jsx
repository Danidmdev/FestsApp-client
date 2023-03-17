import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './UsersCard.css'

const UsersCard = ({ avatar, username, email, role, _id }) => {

    return (
        <Card className='UsersCard col mb-4' >
            <Link to={`/profile/${_id}`}>
                <Card.Img className='UsersCardImg' variant="top" src={avatar} />
            </Link>
            <Card.Body className="mb-3 ">
                <Card.Title className="text-center">{username}</Card.Title>
            </Card.Body>
        </Card >
    )
}

export default UsersCard