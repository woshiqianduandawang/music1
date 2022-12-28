import axios from 'axios'
export default function Request(config) {
  const axiosexample = axios.create({
    baseURL: 'https://www.ccnx.asia/'
  })
  return axiosexample(config)
}