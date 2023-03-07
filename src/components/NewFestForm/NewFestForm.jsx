import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import festsServices from './../../services/fests.services'


const NewFestForm = ({ fireFinalActions }) => {

    const [festData, setFestData] = useState({
        title: '',
        description: '',
        price: 0,
        genre: '',
        imageUrl: '',
        startDate: 0,
        endDate: 0,

    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setFestData({ ...festData, [name]: value })
    }

    const handleFestSubmit = e => {
        e.preventDefault()

        festsServices
            .newFest(festData)
            .then(({ data }) => {
                fireFinalActions()
            })
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleFestSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="title" value={festData.title} onChange={handleInputChange} />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="genre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text" name="genre" value={festData.genre} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="price" value={festData.price} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="imageUrl">
                    <Form.Label>URL imagen</Form.Label>
                    <Form.Control type="url" name="imageUrl" value={festData.imageUrl} onChange={handleInputChange} />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} controlId="startDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" name="startDate" value={festData.startDate} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="endDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" name="endDate" value={festData.endDate} onChange={handleInputChange} />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" name="description" value={festData.description} onChange={handleInputChange} />
            </Form.Group>

            <Button variant="dark" type="submit">Create New Fest</Button>
        </Form>
    );
}

export default NewFestForm