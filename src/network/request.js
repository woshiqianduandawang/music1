import axios from 'axios'
export default function Request(config) {
    const axiosexample = axios.create({
        baseURL : 'http://127.0.0.1:3000'
    })
    return axiosexample(config)
}