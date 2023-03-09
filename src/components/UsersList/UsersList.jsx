import { Col, Row } from "react-bootstrap"
import UsersCard from "../UsersCard/UsersCard"


const UsersList = ({ users }) => {

    return (
        <Row>
            {
                users.map(elm => {
                    return (
                        <Col md={{ span: 3 }} key={elm._id}>
                            < UsersCard {...elm} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default UsersList