import { useContext } from 'react'
import { Toast } from 'react-bootstrap'
import { MessageContext } from '../../contexts/message.context'

const UserMessage = () => {

    const { closeToast, toastMessage, showToast } = useContext(MessageContext)

    return (
        <Toast onClose={closeToast} show={showToast} delay={3000} autohide style={{ position: 'fixed', bottom: 50, right: 10 }}>
            <Toast.Header>
                <strong className="me-auto">Fest App!</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
    )
}

export default UserMessage