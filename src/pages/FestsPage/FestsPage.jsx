import { useContext, useEffect, useState } from "react"
import { Container, Modal, Button, Row, Col } from "react-bootstrap"
import NewFestForm from "../../components/NewFestForm/NewFestForm"
import { AuthContext } from "../../contexts/auth.context"
import festsServices from "../../services/fests.services"
import FestsList from "../../components/FestList/FestList"
import Loader from "../../components/Loader/Loader"
import SearchBar from "../../components/SearchBar/SearchBar"
import './FestPage.css'



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
                            <h1>All Fests</h1>
                            <Row>
                                <Col md={{ span: 6 }}>
                                    <SearchBar handleSearchBar={handleSearchBar} />
                                </Col>
                                <Col className="CreateButton">
                                    {user && <Button onClick={() => setShowModal(true)} variant="outline-dark" size='sm'>Create new Fest</Button>}
                                </Col>
                            </Row>
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