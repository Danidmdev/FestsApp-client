import { useContext, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { MessageContext } from "../../contexts/message.context";
import uploadServices from "../../services/upload.services";
import FormError from "../FormError/FormError";
import festsServices from './../../services/fests.services'




const NewFestForm = ({ fireFinalActions }) => {

    const [festData, setFestData] = useState({
        title: '',
        description: '',
        price: 0,
        genre: '',
        imageUrl: '',
        startDate: '',
        endDate: '',


    })

    const { emitMessage } = useContext(MessageContext)

    const [loadingImage, setLoadingImage] = useState(false)
    const [errors, setErrors] = useState([])

    const handleInputChange = e => {
        const { value, name } = e.target
        setFestData({ ...festData, [name]: value })
    }

    const handleFestSubmit = e => {
        e.preventDefault()

        festsServices
            .newFest(festData)
            .then(({ data }) => {
                emitMessage('Fest created')
                fireFinalActions()
            })
            .catch(err => {
                setErrors(err.response.data.errorMessages)
            })
    }

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setFestData({ ...festData, imageUrl: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
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
                    <Form.Select name="genre" value={festData.genre} onChange={handleInputChange}>
                        <option>Select </option>
                        <option value="Electro">Electro</option>
                        <option value="Reggae">Reggae</option>
                        <option value="Alternative">Alternative</option>
                        <option value="Rock">Rock</option>
                        <option value="Classic">Classic</option>
                        <option value="Mix">Mix</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="price" value={festData.price} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
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


            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)}</FormError>}

            <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading Image' : 'Create New Fest'}</Button>
        </Form>
    );
}

export default NewFestForm