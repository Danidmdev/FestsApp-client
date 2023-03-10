import { useContext, useState, useEffect } from "react"
import { Col, Container, Row, Button } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'
import { Link, useParams } from "react-router-dom"
import usersServices from "../../services/users.services"
import { useNavigate } from "react-router-dom"

const ProfilePage = () => {

    const { logout } = useContext(AuthContext)

    const [users, setUsers] = useState({})

    const navigate = useNavigate()

    const { user_id } = useParams()
    console.log(user_id)

    useEffect(() => {
        usersServices
            .getProfile(user_id)
            .then(({ data }) => {
                setUsers(data)
            })
            .catch(err => console.error(err))
    }, [])

    const deleteUser = (user_id) => {
        usersServices
            .deletProfile(user_id)
            .then(() => {
                navigate('/fests')
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <h1 className="mt-3 mb-5">Hi! {users.username}</h1>
            <Row>
                <Col md={6} className="mb-5">
                    <img src={users.avatar} alt="avatar" />
                </Col>
                <Col>
                    <h4>{users.email}</h4>
                    <h4>{users.role}</h4>
                    <Link to={`/edit-user/${users._id}`}>
                        <Button as="figure" variant="warning">Edit User</Button>
                    </Link>
                    <Link>
                        <Button as="figure" variant="danger" onClick={() => {
                            deleteUser(user_id)
                            logout(user_id)
                        }}>Eliminar</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilePage
