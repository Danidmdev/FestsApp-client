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

    getNewComment(fest_id, commentData) {
        return this.api.post(`/newComment/${fest_id}`, commentData)
    }

    editComment(comment_id, commentData) {
        return this.api.put(`/edit-comment/${comment_id}`, commentData)
    }

    deleteComment(comment_id) {
        return this.api.delete(`/delete-comment/${comment_id}`)
    }

}


const commentsService = new CommentsService()

export default commentsService