import axios, {AxiosInstance} from "axios";

const apiClient : AxiosInstance = axios.create({
    baseURL : process.env.API_URL || 'http://localhost:8081',
    headers : {
        "Content-Type": "application/json",
    }
})

export default apiClient;
