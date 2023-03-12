import { useContext, useEffect, useState } from "react"
import { Container, Modal, Button } from "react-bootstrap"
import usersServices from "../../services/users.services"
import UsersList from "../../components/UsersList/UsersList"
import SearchBar from "../../components/SearchBar/SearchBar"

const UsersPage = () => {


    const [users, setUsers] = useState([])
    const [usersBackup, setUsersBackup] = useState('')


    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {
        usersServices
            .getAllUsers()
            .then(({ data }) => {
                setUsers(data)
                setUsersBackup(data)

            })
            .catch(err => console.log(err))
    }

    const handleSearchBar = e => {
        const filteredUsers = usersBackup.filter(elm => elm.username.toLowerCase().includes(e.target.value.toLowerCase()))
        setUsers(filteredUsers)
    }

    return (

        <Container>

            <>
                <h1>Users</h1>
                <hr />
                <SearchBar handleSearchBar={handleSearchBar} />
                <UsersList users={users} />
            </>

        </Container>




    )
}

export default UsersPage