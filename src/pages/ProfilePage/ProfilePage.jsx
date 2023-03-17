import { useContext, useState, useEffect, cloneElement } from "react"
import { Col, Container, Row, Button, Figure } from "react-bootstrap"
import { AuthContext } from './../../contexts/auth.context'
import { Link, useParams } from "react-router-dom"
import usersServices from "../../services/users.services"
import festsServices from "../../services/fests.services"
import { useNavigate } from "react-router-dom"
import FestUserCard from "../../components/FestUserCard/FestUserCard"
import Loader from "../../components/Loader/Loader"
import './ProfilePage.css'

const ProfilePage = () => {

    const { user, logout } = useContext(AuthContext)

    const [users, setUsers] = useState({})

    const [myFests, setMyFests] = useState([])

    const [myFestsJoined, setMyFestsJoined] = useState([])

    const navigate = useNavigate()

    const { user_id } = useParams()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadData()
    }, [user_id])

    const loadData = () => {

        usersServices
            .getProfile(user_id)
            .then(({ data }) => {
                setUsers(data)
                setIsLoading(false)
            })
            .catch(err => console.error(err))

        festsServices
            .getByOwner(user_id)
            .then(({ data }) => {
                setMyFests(data)

            })
            .catch(err => console.log(err))

        festsServices
            .getJoniedFest(user_id)
            .then(({ data }) => {
                setMyFestsJoined(data)
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
            {
                isLoading
                    ?
                    <Loader />
                    :
                    <>
                        <h1 className=" Title mt-3 mb-3">{users.username}</h1>
                        <hr />
                        <Row className="g-4">
                            {myFests.length > 0 && <Col xs={6} sm={6} md={6} lg={6} xl={6} className="mb-5">
                                <h3>Fests Created </h3>
                                <hr />
                                <Col >
                                    {myFests.map(fest => (
                                        <FestUserCard
                                            key={fest._id}
                                            imageUrl={fest.imageUrl}
                                            title={fest.title}
                                            _id={fest._id}
                                            owner={fest.owner}
                                            onDelete={() => deleteUserFest(fest._id)}
                                        />
                                    ))}
                                </Col>
                            </Col >}
                            <Col md={3} className="offset-md-2 mb-5">
                                <img className=" Avatar mb-3" src={users.avatar} alt="avatar" />
                                <h5>  📩  {users.email}</h5>
                                {(user._id === user_id || user.role === 'ADMIN') && <Col>
                                    <div className="buttonClass" >
                                        <Link to={`/edit-user/${users._id}`}>
                                            {<Button as="figure" size="sm" variant="outline-warning">Edit User</Button>}
                                        </Link>
                                    </div>
                                    <div className="buttonClass">
                                        <Link>
                                            < Button as="figure" size="sm" variant="outline-danger" onClick={() => {
                                                deleteUser(user_id)
                                                logout(user_id)
                                            }}>Eliminar</Button>
                                        </Link>
                                    </div>
                                </Col>}
                                {myFestsJoined.length > 0 && <Col className="mt-2">
                                    <h5>Fests Joined</h5>
                                    <hr />
                                    {myFestsJoined.map((elm, idx) => (
                                        < Figure key={idx} >
                                            <Link to={`/details/${elm._id}`}>
                                                <Figure.Image className="festJoinedImg" src={elm.imageUrl} alt="fest image" />
                                            </Link>
                                        </Figure>
                                    ))}
                                </Col>}
                            </Col>
                        </Row>
                    </>}
        </Container >
    )
}

export default ProfilePage
