import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './UsersCard.css'

const UsersCard = ({ avatar, username, email, role, _id }) => {

    return (
        <Card className='UsersCard mb-3' >
            <Link to={`/profile/${_id}`}>
                <Card.Img variant="top" src={avatar} />
            </Link>
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Card.Text>{email}</Card.Text>
            </Card.Body>
        </Card >
    )
}

export default UsersCard