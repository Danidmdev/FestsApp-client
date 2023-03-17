import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Figure, Nav, Navbar } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import Logo from './../../components/assets/LogoFestNoBg.png'
import './SideNavBar.css'

const SideNavBar = ({ isOpen, onToggle }) => {

    const { user, logout } = useContext(AuthContext)


    const toggleMenu = () => {
        onToggle(!isOpen)
    }

    return (
        <>

            <button variant="outline-info" onClick={toggleMenu} className="toggle-menu-button">{isOpen ? "Close" : "Open"}</button>
            <Navbar className={`vertical-navbar ${isOpen ? 'is-open' : 'is-closed'}`} >

                <ul>
                    <li>
                        <Link to="/">
                            <img className='Logo' src={Logo} alt="Logo" />
                        </Link>
                    </li>
                    <hr className='navbarHr' />
                    <li>
                        <Link to={`/profile/${user?._id}`} >
                            {user && <Navbar.Text> <img className='avatarImg' src={user.avatar} alt="avatar-image" /></Navbar.Text>}
                        </Link>
                    </li>
                    <li className='links'>
                        <Link to="/fests">
                            <Nav.Link as="span">Fests</Nav.Link>
                        </Link>
                    </li>
                    <li className='links'>
                        <Link to="/create">
                            <Nav.Link as="span">New Fest</Nav.Link>
                        </Link>
                    </li>
                    <li className='links'>
                        <Link to="/allUsers">
                            <Nav.Link as="span">All Users</Nav.Link>
                        </Link>
                    </li>

                    {
                        user
                            ?
                            <>
                                <li className='links'>
                                    <Link to={`/profile/${user._id}`}>
                                        <Nav.Link as="span">Profile</Nav.Link>
                                    </Link>
                                </li>
                                <li className='links'>
                                    <Link>
                                        <Nav.Link as="span" onClick={logout}>Log out</Nav.Link>
                                    </Link>
                                </li>
                            </>
                            :
                            <>
                                <li className='links'>
                                    <Link to="/log-in">
                                        <Nav.Link as="span">Log in</Nav.Link>
                                    </Link>
                                </li>
                                <li className='links'>
                                    <Link to="/sign-up">
                                        <Nav.Link as="span">Sign up</Nav.Link>
                                    </Link>
                                </li>
                            </>
                    }
                </ul>

            </Navbar>


        </>
    )
}

export default SideNavBar;
