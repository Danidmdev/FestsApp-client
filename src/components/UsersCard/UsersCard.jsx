import { Card } from 'react-bootstrap'
import './UsersCard.css'

const UsersCard = ({ avatar, username, email, role }) => {

    return (
        <Card className='UsersCard mb-3' >
            <Card.Img variant="top" src={avatar} />
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Card.Text>{email}</Card.Text>
                <Card.Text>{role}</Card.Text>
            </Card.Body>
        </Card >
    )
}

export default UsersCard