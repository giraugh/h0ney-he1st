import axios from 'axios'
 
import { apiUrl } from 'config/env'

const api = axios.create({
    baseURL: apiUrl,
    timeout: 1000 * 30,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api