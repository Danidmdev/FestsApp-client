import { Button, Container, Figure } from 'react-bootstrap'
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom'
import VideoHomePage from '../../components/assets/logo-video.mp4'
import Logo from './../../components/assets/LogoFestNoBg.png'
import './HomePage.css'

const HomePage = () => {

    return (
        <Container className="Home">


            <Link to="/fests">
                <ReactPlayer url={VideoHomePage} playing loop muted width="100%" height="auto" />
            </Link>

        </Container>
    )
}

export default HomePage