import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
})

axios.interceptors.request.use(function (config) {
  let user = JSON.parse(window.sessionStorage.getItem('qwId')).token
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + user
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
