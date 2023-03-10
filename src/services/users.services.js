import axios from 'axios'

class UsersService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllUsers() {
        return this.api.get('/getAllUsers')
    }

    getProfile(user_id) {
        return this.api.get(`/profile/${user_id}`)
    }

    editProfile(user_id, usersData) {
        return this.api.put(`/edit-profile/${user_id}`, usersData)
    }

    deletProfile(user_id) {
        return this.api.delete(`/delete-profile/${user_id}`)
    }


}

const usersService = new UsersService()

export default usersService