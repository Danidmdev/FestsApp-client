import { useContext, useEffect, useState } from "react"
import { Container, Modal, Button, Row, Col } from "react-bootstrap"
import NewFestForm from "../../components/NewFestForm/NewFestForm"
import { AuthContext } from "../../contexts/auth.context"
import festsServices from "../../services/fests.services"
import FestsList from "../../components/FestList/FestList"
import Loader from "../../components/Loader/Loader"
import SearchBar from "../../components/SearchBar/SearchBar"

const FestsPage = () => {

    const [showModal, setShowModal] = useState(false)
    const [fests, setFests] = useState([])
    const [festsBackup, setFestsBackup] = useState('')
    const [isLoading, setIsLoading] = useState(true)


    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadFests()
    }, [])

    const loadFests = () => {
        festsServices
            .getAllFests()
            .then(({ data }) => {
                setFests(data)
                setFestsBackup(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleSearchBar = e => {
        const filteredFests = festsBackup.filter(elm => elm.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setFests(filteredFests)
    }


    const fireFinalActions = () => {
        setShowModal(false)
        loadFests()
    }

    return (


        <>
            <Container>
                {
                    isLoading
                        ?
                        <Loader />
                        :

                        <>
                            <h1>Fest List (provisional esto no es un lab!!!!)</h1>
                            <Row>
                                <Col md={{ span: 6 }}>
                                    <SearchBar handleSearchBar={handleSearchBar} />
                                </Col>
                            </Row>
                            {user && <Button onClick={() => setShowModal(true)} variant="dark" size='sm'>Create new Fest</Button>}
                            <hr />
                            <FestsList fests={fests} />
                        </>
                }

            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton> <Modal.Title>New Fest</Modal.Title></Modal.Header>
                <Modal.Body>
                    <NewFestForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>

        </>
    )
}

export default FestsPage