import { useContext, useState } from "react"
import { Card, Accordion, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './FestCard.css'
import FestsDetails from "../../components/FestsDetails/FestsDetails"



const FestCard = ({ imageUrl, title, _id, startDate, endDate, price }) => {

    const [showModal, setShowModal] = useState(false)



    const fireFinalActions = () => {
        setShowModal(false)

    }
    return (
        <>
            <>
                <Card className=' FestCard col mb-4'>
                    <Link to={`/details/${_id}`}>
                        <Card.Img className="FestCardImg" variant="top" src={imageUrl} />
                    </Link>
                    <Card.Body className="mb-3 ">
                        <Card.Title className="text-center">{title}</Card.Title>
                        <Accordion className="custom-accordion">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="header-accordion">Event Date</Accordion.Header>
                                <Accordion.Body>
                                    {new Date(startDate).toLocaleDateString()} | {new Date(endDate).toLocaleDateString()}
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Price</Accordion.Header>
                                <Accordion.Body>
                                    {price} €
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Body>
                </Card>
            </>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton> <Modal.Title>Details</Modal.Title></Modal.Header>
                <Modal.Body>
                    <FestsDetails fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default FestCard;