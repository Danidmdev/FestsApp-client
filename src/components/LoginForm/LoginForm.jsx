import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import authService from "../../services/auth.services"
import { useNavigate } from 'react-router-dom'
import { MessageContext } from "../../contexts/message.context"
import FormError from "../FormError/FormError"

import * as Constants from './../../consts'


const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const { authenticateUser, user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { emitMessage } = useContext(MessageContext)
    const [error, setError] = useState('')


    const handleInputChange = e => {
        const { value, name } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = e => {

        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                localStorage.setItem('authToken', data.authToken)
                authenticateUser()
                emitMessage(Constants.LOGGED_IN_MSG)
                navigate('/fests')
            })
            .catch(err => {
                setError(err.response.data.message)
                console.log(err)
            })
    }

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={loginData.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" value={loginData.password} onChange={handleInputChange} name="password" />
            </Form.Group>

            {error.length > 0 && <FormError><p>{error}</p></FormError>}

            <div className="d-grid">
                <Button variant="outline-dark" type="submit">Acceder</Button>
            </div>

        </Form>
    )
}

export default LoginForm