import axios from 'axios'

import { BASE_URL } from './env'

const instance = axios.create({
  baseURL: `${BASE_URL}/api`,
})

export default instance
