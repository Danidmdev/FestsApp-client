import { useContext, useEffect, useState } from "react"
import { Container, Modal, Button } from "react-bootstrap"
import { AuthContext } from "../../contexts/auth.context"
import usersServices from "../../services/users.services"
import UsersList from "../../components/UsersList/UsersList"

const UsersPage = () => {


    const [users, setUsers] = useState([])


    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {
        usersServices
            .getAllUsers()
            .then(({ data }) => {
                setUsers(data)

            })
            .catch(err => console.log(err))
    }



    return (

        <Container>

            <>
                <h1>Users List (provisional esto no es un lab!!!!)</h1>
                <hr />
                <UsersList users={users} />
            </>

        </Container>




    )
}

export default UsersPage