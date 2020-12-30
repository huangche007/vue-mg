import axios from 'axios'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 1000 // request timeout，30秒
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const path = config.url.split('?')[0]
    let search = config.url.split('?')[1] || ''

    // 添加时间戳
    search = ('?_v=' + Date.now()) + (search ? '&' + search : '')
    config.url = path + search
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
