import { useEffect, useState, useContext } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"
import festsServices from './../../services/fests.services'
import uploadServices from "../../services/upload.services"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { AuthContext } from './../../contexts/auth.context'

const EditFestForm = () => {

    const [festData, setFestData] = useState({
        title: '',
        description: '',
        price: 0,
        genre: '',
        imageUrl: '',
        startDate: '',
        endDate: '',

    })

    const [loadingImage, setLoadingImage] = useState(false)

    const { fest_id } = useParams()

    const navigate = useNavigate()

    const { user } = useContext(AuthContext)

    useEffect(() => {
        console.log(festData)
    }, [festData])

    const handleInputChange = e => {
        const { value, name } = e.target
        setFestData({ ...festData, [name]: value })
    }

    useEffect(() => {
        details(fest_id)
    }, [])

    const details = (fest_id) => {
        festsServices
            .getDetails(fest_id)
            .then(({ data }) => {
                const { title, description, price, genre, startDate, endDate, } = data
                setFestData({ title, description, price, genre, imageUrl: '', startDate, endDate })
            })
            .catch(err => console.error(err))
    }

    const handleFestSubmit = e => {
        e.preventDefault()

        festsServices
            .edit(fest_id, festData)
            .then(({ data }) => {
                navigate(`/profile/${user._id}`)

            })
            .catch(err => console.log(err))
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
                    <Form.Label>Imagen (URL)</Form.Label>
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

            <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading Image' : 'Edit Fest'}</Button>
        </Form>
    );
}

export default EditFestForm




