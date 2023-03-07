import { Col, Row } from "react-bootstrap"
import FestCard from "../FestCard/FestCard"

const FestsList = ({ fests }) => {

    return (
        <Row>
            {
                fests.map(elm => {
                    return (
                        <Col md={{ span: 3 }} key={elm._id}>
                            < FestCard {...elm} />
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default FestsList