import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import NewFestForm from '../../components/NewFestForm/NewFestForm'

const NewFestPage = () => {

    const navigate = useNavigate()

    const fireFinalActions = () => {
        navigate('/fests')
    }

    return (
        <Container>

            <h1>New Fest</h1>
            <hr />
            <NewFestForm fireFinalActions={fireFinalActions} />

        </Container>
    )
}

export default NewFestPage