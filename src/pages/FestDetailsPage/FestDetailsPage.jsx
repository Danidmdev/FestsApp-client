import { useEffect, useState, useContext } from "react"
import { Container, Button, Row, Col } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import festsServices from "../../services/fests.services"
import { useNavigate } from "react-router-dom"
import { AuthContext } from './../../contexts/auth.context'
import './FestDetailsPage.css'
import FestDetails from "../../components/FestsDetails/FestsDetails"



const FestDetailsPage = () => {

    const [fest, setFest] = useState({})

    const { fest_id } = useParams()

    // const navigate = useNavigate()

    // const { user } = useContext(AuthContext)



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

            <FestDetails fest={fest} loadFestData={loadFestData} />


        </Container >
    )
}

export default FestDetailsPage