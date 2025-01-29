import {configEnv} from "../config/configEnv";
export default function setupAxios(axios) {
    axios.interceptors.request.use(
        (config) => {
            const accessToken = localStorage.getItem(configEnv.AUTH_ACCESS_TOKEN_KEY);
            if (accessToken)
                config.headers.Authorization = `Bearer ${accessToken}`
            return config
        },
        (err) => {
            return Promise.reject(err)
        }
    )
}
