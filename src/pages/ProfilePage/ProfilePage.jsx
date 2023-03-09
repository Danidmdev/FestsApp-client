import { useContext } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'

const ProfilePage = () => {
    const { user } = useContext(AuthContext)

    return (
        <Container>
            <h1 className="mt-3 mb-5">Hi! {user.username}</h1>
            <Row>
                <Col md={6} className="mb-5">
                    <img src={user.avatar} alt="avatar" />
                </Col>
                <Col>
                    <h4>{user.email}</h4>
                    <h4>{user.role}</h4>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage
