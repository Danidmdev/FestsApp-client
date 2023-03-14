import { useEffect, useState, useContext } from "react"
import { Container, Button, Row, Col } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import festsServices from "../../services/fests.services"
import './FestDetailsPage.css'
import FestDetails from "../../components/FestsDetails/FestsDetails"
import CommentsSection from "../../components/CommentsSection/CommentsSection"



const FestDetailsPage = () => {

    const [fest, setFest] = useState({})

    const { fest_id } = useParams()


    useEffect(() => {
        loadFestData()
    }, [])

    const loadFestData = () => {
        festsServices
            .getDetails(fest_id)
            .then(({ data }) => {
                setFest(data)
            })
            .catch(err => console.error(err))

    }

    return (

        <Container>
            <section >
                <FestDetails fest={fest} loadFestData={loadFestData} />
            </section>
            <section className="Comments">
                < CommentsSection />
            </section>


        </Container >
    )
}

export default FestDetailsPage