import axios from "axios"

class FestServices {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/fests`
        })
    }

    getAllFests() {
        return this.api.get('/getAllFests')
    }

    details(fest_id) {
        return this.api.get(`/details/${fest_id}`)
    }

    newFest(festData) {
        return this.api.post('/newFest', festData)
    }

    edit(fest_id) {
        return this.api.put(`/edit/${fest_id}`)
    }

    delete(fest_id) {
        return this.api.delete(`/delete/${fest_id}`)
    }

}

const festsServices = new FestServices()

export default festsServices