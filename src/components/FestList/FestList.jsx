import { Col, Row } from "react-bootstrap"
import FestCard from "../FestCard/FestCard"

const FestsList = ({ fests }) => {

    return (
        <Row>
            {
                fests.map(elm => {
                    return (
                        <Col xs={12} sm={6} md={6} lg={4} xl={3} key={elm._id}>
                            <FestCard {...elm} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default FestsList