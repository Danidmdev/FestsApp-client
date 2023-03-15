import { useState, useContext, useEffect } from "react"
import { Form, Button, Col, Row, Container } from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import uploadServices from "../../services/upload.services"
import { MessageContext } from "../../contexts/message.context"
import usersServices from "../../services/users.services"
import { AuthContext } from "../../contexts/auth.context"
import * as Constants from './../../consts'

const EditUserForm = () => {

    const [usersData, setUsersData] = useState({
        username: '',
        email: '',
        avatar: ''
    })

    const { refreshToken } = useContext(AuthContext)

    const [loadingImage, setLoadingImage] = useState(false)

    const { emitMessage } = useContext(MessageContext)

    const navigate = useNavigate()

    const { user_id } = useParams()



    const handleInputChange = e => {
        const { value, name } = e.target
        setUsersData({ ...usersData, [name]: value })
    }

    useEffect(() => {
        getProfile(user_id)
    }, [])

    const getProfile = (user_id) => {
        usersServices
            .getProfile(user_id)
            .then(({ data }) => {
                const { username, email } = data
                setUsersData({ username, email, avatar: '' })

            })
            .catch(err => console.error(err))
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        usersServices
            .editProfile(user_id, usersData)
            .then(({ data }) => {
                navigate(`/profile/${user_id}`)
                emitMessage(Constants.EDIT_USER_MSG)
                refreshToken()
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
                setUsersData({ ...usersData, avatar: res.data.cloudinary_url })
                setLoadingImage(false)


            })
            .catch(err => {
                console.log(err)
                setLoadingImage(false)
            })
    }

    return (

        <Form onSubmit={handleFormSubmit}>
            <Row>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={usersData.username} onChange={handleInputChange} name="username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={usersData.email} onChange={handleInputChange} name="email" />
                </Form.Group>

                <Form.Group as={Col} controlId="avatar">
                    <Form.Label>Avatar (URL)</Form.Label>
                    <Form.Control type="file" onChange={handleFileUpload} />
                </Form.Group>
            </Row>

            <div className="d-grid mt-4">
                <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Loading Image' : 'Edit'}</Button>
            </div>

        </Form>

    )
}

export default EditUserForm