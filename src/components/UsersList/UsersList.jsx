import { Col, Row } from "react-bootstrap"
import UsersCard from "../UsersCard/UsersCard"


const UsersList = ({ users }) => {

    return (
        <Row>
            {
                users.map(elm => {
                    return (
                        <Col xs={12} sm={6} md={6} lg={4} xl={3} key={elm._id}>
                            < UsersCard {...elm} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default UsersList