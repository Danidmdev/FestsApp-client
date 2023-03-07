import axios from 'axios'

class UsersService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
        })
    }

    getAllUsers() {
        return this.api.get('/getAllUsers')
    }

    profile(users_id) {
        return this.api.get(`/profile/${users_id}`)
    }

    editProfile(users_id) {
        return this.api.put(`/edit-profile/${users_id}`)
    }

    deletProfile(users_id) {
        return this.api.delete(`/delete-profile/${users_id}`)
    }

    uploadImage(file) {
        return this.api.post('/upload', file)
    }


}

const usersService = new UsersService()

export default usersService