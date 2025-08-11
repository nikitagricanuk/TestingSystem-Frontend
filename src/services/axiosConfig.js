import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.timeout = 5000;

export default axios;
