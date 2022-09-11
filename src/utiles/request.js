import axios from 'axios'
import store from '@/store'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 3000
// export default axios
const request = axios.create({
  timeout: 3000,
  baseURL: 'http://toutiao.itheima.net'
})
request.interceptors.request.use(
  function (config) {
    const {
      state: { tokenObj },
      getters: { isLogin }
    } = store
    // 在发送请求之前做些什么
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default request
