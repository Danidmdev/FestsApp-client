import { useContext, useState, useEffect } from "react"
import { Col, Container, Row, Button } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'
import { Link, useParams } from "react-router-dom"
import usersServices from "../../services/users.services"
import festsServices from "../../services/fests.services"
import { useNavigate } from "react-router-dom"
import FestUserCard from "../../components/FestUserCard/FestUserCard"

const ProfilePage = () => {

    const { logout } = useContext(AuthContext)

    const [users, setUsers] = useState({})
    const [myFests, setMyFests] = useState([])

    const navigate = useNavigate()

    const { user_id } = useParams()


    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        usersServices
            .getProfile(user_id)
            .then(({ data }) => {
                setUsers(data)
            })
            .catch(err => console.error(err))

        festsServices
            .getByOwner(user_id)
            .then(({ data }) => {
                setMyFests(data)
            })
            .catch(err => console.log(err))
    }

    const deleteUserFest = (fest_id) => {
        festsServices
            .deleteFest(fest_id)
            .then(() => {
                loadData()
            })
            .catch(err => console.log(err))
    }

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
            <h1 className="mt-3 mb-3">{users.username}</h1>
            <hr />
            <Row className="g-4">
                <Col md={6} className="mb-5">
                    <h3>Fests Created </h3>
                    <hr />
                    {myFests.map(fest => (
                        <FestUserCard
                            key={fest._id}
                            imageUrl={fest.imageUrl}
                            title={fest.title}
                            _id={fest._id}
                            description={fest.description}
                            genre={fest.genre}
                            startDate={fest.startDate}
                            endDate={fest.endDate}
                            price={fest.price}
                            onDelete={() => deleteUserFest(fest._id)}
                        />
                    ))}
                </Col >
                <Col md={4} className="offset-md-2 mb-5">
                    <img className="mb-3" src={users.avatar} alt="avatar" />
                    <h5> Email: {users.email}</h5>
                    <h5> Role: {users.role}</h5>
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
        </Container >
    )
}

export default ProfilePage
