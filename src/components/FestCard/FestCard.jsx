import { Card, Accordion } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './FestCard.css'



const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const FestCard = ({ imageUrl, title, _id, description, genre, startDate, endDate, price }) => {


    const introDate = formatDate(startDate);
    const finishDate = formatDate(endDate);


    return (

        <Card className='mb-3 FestCard'>
            <Link to={`/details/${_id}`}>
                <Card.Img variant="top" src={imageUrl} />
            </Link>
            <Card.Body>
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
                            {introDate} | {finishDate}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Price</Accordion.Header>
                        <Accordion.Body>
                            {price} €
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>

    )
}

export default FestCard;