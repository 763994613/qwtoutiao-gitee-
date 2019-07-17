import axios from 'axios'
import JSONbig from 'json-bigint'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transformResponse: [function (data, headers) {
    if (data) {
      return JSONbig.parse(data)
    }
    return data
  }]
})

instance.interceptors.request.use(function (config) {
  let user = window.sessionStorage.getItem('qwId')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response && error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
