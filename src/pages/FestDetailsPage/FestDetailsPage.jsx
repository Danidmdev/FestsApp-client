import { useEffect, useState } from "react"
import { Container, Button } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import festsServices from "../../services/fests.services"




const FestDetailsPage = () => {

    const [fest, setFest] = useState({})

    const { fest_id } = useParams()

    console.log(fest_id)

    useEffect(() => {
        festsServices
            .details(fest_id)
            .then(({ data }) => setFest(data))
            .catch(err => console.error(err))
    }, [])


    return (

        <Container>

            <h1 className="mb-4"> {`${fest.title}`} details</h1>
            <hr />
            <p>{fest.description}</p>

            <Link to="/fests">
                <Button as="figure" variant="dark">Back to All Fests</Button>
            </Link>

        </Container >
    )
}

export default FestDetailsPage