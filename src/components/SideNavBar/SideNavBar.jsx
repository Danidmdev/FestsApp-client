import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import './SideNavBar.css'

const SideNavBar = ({ isOpen, onToggle }) => {

    const { user, logout } = useContext(AuthContext)


    const toggleMenu = () => {
        onToggle(!isOpen)
    }

    return (
        <>

            <Button variant="outline-info" onClick={toggleMenu} className="toggle-menu-button">{isOpen ? "Close" : "Open"}</Button>
            <Navbar className={`vertical-navbar ${isOpen ? 'is-open' : 'is-closed'}`} >

                <ul>
                    <li>
                        <Link to={`/profile/${user?._id}`} >
                            {user && <Navbar.Text> <img className='avatarImg' src={user.avatar} alt="" /></Navbar.Text>}
                        </Link>
                    </li>
                    <hr />
                    <li>
                        <Link to="/">
                            <Navbar.Brand as="span">Fests-App</Navbar.Brand>
                        </Link>
                    </li>
                    <li>
                        <Link to="/fests">
                            <Nav.Link as="span">Fests</Nav.Link>
                        </Link>
                    </li>
                    <li>
                        <Link to="/create">
                            <Nav.Link as="span">New Fest</Nav.Link>
                        </Link>
                    </li>
                    <li>
                        <Link to="/allUsers">
                            <Nav.Link as="span">All Users</Nav.Link>
                        </Link>
                    </li>

                    {
                        user
                            ?
                            <>
                                <li>
                                    <Link to={`/profile/${user._id}`}>
                                        <Nav.Link as="span">Profile</Nav.Link>
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        <Nav.Link as="span" onClick={logout}>Log out</Nav.Link>
                                    </Link>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link to="/log-in">
                                        <Nav.Link as="span">Log in</Nav.Link>
                                    </Link>
                                </li>
                                <li>
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
