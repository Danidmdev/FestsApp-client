import { useEffect, useState, useContext } from "react"
import { Container, Button, Row, Col, Figure } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import festsServices from "../../services/fests.services"
import { useNavigate } from "react-router-dom"
import React from 'react'
import ReactPlayer from 'react-player'
import { MessageContext } from "../../contexts/message.context"
import './FestsDetails.css'
import * as Constants from './../../consts'



const FestDetails = ({ fest, loadFestData }) => {

    const { fest_id } = useParams()

    const navigate = useNavigate()

    const [isMuted, setIsMuted] = useState(true);

    const { emitMessage } = useContext(MessageContext)

    const [festData, setFestData] = useState({
        fans: ""
    })

    const [showMore, setShowMore] = useState(false)

    const handleShowMore = () => {
        setShowMore(!showMore)
    }

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {

        festsServices
            .getDetails(fest_id)
            .then(({ data }) => {
                let { fans } = data
                setFestData({ fans })
                loadFestData()
            })
            .catch(err => console.error(err))
    }

    const handleJoinFest = () => {
        festsServices
            .joinFest(fest_id, festData)
            .then(({ data }) => {
                const { fans } = data
                setFestData({ fans })
                loadFestData()
                emitMessage(Constants.JOIN_FEST_MSG)
            })
            .catch(err => console.log(err))
    }

    const handleLeaveFest = () => {
        festsServices
            .leaveFest(fest_id, festData)
            .then(({ data }) => {
                const { ...fans } = data
                setFestData({ fans })
                loadFestData()
                emitMessage(Constants.LEAVE_FEST_MSG)
            })
    }

    return (

        <Container>

            <h1 className="mb-4"> {fest.title}</h1>
            <hr />
            <Row className="">
                <Col className="mb-2">
                    <Figure >
                        <Figure.Image className="festImage" src={fest.imageUrl} alt="fest image" />
                    </Figure>
                    <Col>
                        <div className="buttonClass">
                            <Link to="">
                                <Button onClick={handleLeaveFest} as="span" variant="outline-dark"> Leave</Button>
                            </Link>
                        </div>
                        <div className="buttonClass">
                            <Link to="">
                                <Button onClick={handleJoinFest} as="span" variant="outline-dark"> Join</Button>
                            </Link>
                        </div>
                    </Col>
                </Col>
                {fest.video && <Col >
                    <ReactPlayer
                        className="VideoYoutube"
                        url={fest.video}
                        playing
                        muted={isMuted}
                        width="100%" height="85%" />
                    <Button variant="outline-white" onClick={() => {
                        setIsMuted(!isMuted)
                    }}>
                        {isMuted ? '🔇' : '🔊'}
                    </Button>
                </Col>}
            </Row >
            <Row>
                <Col >
                    <h5>Users joined:</h5>
                    {fest.fans?.map((elm, idx) => (
                        <Figure key={idx}>
                            <Link to={`/profile/${elm._id}`}>
                                <Figure.Image className="festAvatar" src={elm.avatar} alt={elm.username} />
                            </Link>
                        </Figure>
                    ))}
                </Col>

            </Row>
            <Row  >
                <Col>
                    <h5>  🗓 {new Date(fest.startDate).toLocaleDateString()} | {new Date(fest.endDate).toLocaleDateString()}</h5>
                    <h5> 🎶  {fest.genre}</h5>
                    <h5> 💸 {fest.price} €</h5>
                    <p>{showMore ? fest.description : `${fest.description.slice(0, 200)}...`}
                        <span onClick={handleShowMore} className="mt-0">
                            {showMore ? "⬆️" : "⬇️"}
                        </span>
                    </p>
                </Col>
                {fest.website && <Col >
                    <Link to={`${fest.website}`} target="_blank">
                        <h5>WEB OFICIAL </h5>
                        <p className="Emoji"> ➡️💻 </p>
                    </Link>
                </Col>}
            </Row>

        </Container >
    )
}

export default FestDetails
