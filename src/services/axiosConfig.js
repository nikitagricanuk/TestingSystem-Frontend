import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/v1";
axios.defaults.timeout = 9000;

export default axios;
