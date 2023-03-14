import axios from 'axios'

class CommentsService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/comments`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getCommentByFest(fest_id) {
        return this.api.get(`/getCommentByFest/${fest_id}`)
    }
}


const commentsService = new CommentsService()

export default commentsService