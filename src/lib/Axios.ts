import axios from "axios";

const Axios = axios.create({
    baseURL : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
})

export default Axios