import { useEffect, useState, useContext } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"
import festsServices from './../../services/fests.services'
import uploadServices from "../../services/upload.services"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { AuthContext } from './../../contexts/auth.context'
import { MessageContext } from "../../contexts/message.context"
import * as Constants from './../../consts'

const EditFestForm = () => {

    const [festData, setFestData] = useState({
        title: '',
        description: '',
        price: 0,
        genre: '',
        imageUrl: '',
        startDate: '',
        endDate: '',
        video: '',
        website: ''

    })

    const [loadingImage, setLoadingImage] = useState(false)

    const { fest_id } = useParams()

    const navigate = useNavigate()

    const { emitMessage } = useContext(MessageContext)

    const { user } = useContext(AuthContext)

    useEffect(() => {
        console.log(festData)
    }, [festData])

    const handleInputChange = e => {
        const { value, name } = e.target
        setFestData({ ...festData, [name]: value })
    }

    useEffect(() => {
        getFestDetails(fest_id)
    }, [])

    const getFestDetails = (fest_id) => {
        festsServices
            .getDetails(fest_id)
            .then(({ data }) => {
                const { title, description, price, genre, startDate, endDate, video, website } = data
                setFestData({ title, description, price, genre, imageUrl: '', startDate, endDate, video, website })
            })
            .catch(err => console.error(err))
    }

    const handleFestSubmit = e => {
        e.preventDefault()

        festsServices
            .edit(fest_id, festData)
            .then(({ data }) => {
                navigate(`/profile/${user._id}`)
                emitMessage(Constants.EDIT_FEST_MSG)

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
                        {
                            Constants.FETIVAL_GENERES.map(elm => <option key={elm} value={elm}>{elm}</option>)
                        }
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

            <Row>
                <Form.Group className="mb-3" controlId="video">
                    <Form.Label>Video Url</Form.Label>
                    <Form.Control type="text" name="video" value={festData.video} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control type="text" name="website" value={festData.website} onChange={handleInputChange} />
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




