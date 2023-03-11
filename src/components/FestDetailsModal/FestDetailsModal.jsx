import { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import festsServices from "../../services/fests.services"
import FestDetails from "./../FestsDetails/FestsDetails"


const FestDetailsModal = ({ setShowModalDetails, showModalDetails }) => {

    const [fest, setFest] = useState(undefined)


    useEffect(() => {
        getDetails()
    }, [showModalDetails])

    const getDetails = () => {
        festsServices
            .getDetails()
            .then(({ data }) => setFest(data))
            .catch(err => console.log(err))
    }

    return (
        <>
            {

                <Modal show={showModalDetails} onHide={() => setShowModalDetails(false)}>
                    <Modal.Header closeButton ><Modal.Title>Fest Details</Modal.Title></Modal.Header>
                    <Modal.Body ><FestDetails fest={fest} /> </Modal.Body>
                </Modal>

            }
        </>
    )
}

export default FestDetailsModal