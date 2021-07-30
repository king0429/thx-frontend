import axios from 'axios'
import firebaseConfig from '../config/firebase'
import { baseURL } from '../config'


const $instance = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? '' : baseURL,
  timeout: 60 * 1000
})

// 拦截请求
$instance.interceptors.request.use(async (config:any) => {
  return config
}, err => {
  console.log(err)
  return Promise.reject(err)
})

// 拦截返回
$instance.interceptors.response.use((res:any) => {
  if (res.data.code === 2000000) {
    // window.location.href = window.location.origin + '/login'
  } else {
    localStorage.setItem('lastApiTime', new Date().getTime().toString())
    return res
  }
}, (err: any) => {
  console.log(err)
  return err
})

export default $instance
