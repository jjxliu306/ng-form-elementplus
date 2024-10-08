//import axios from 'axios'
import * as axios from 'axios';
//const axios = require('axios');

const request = axios.create({
  withCredentials: false
})

/**
 * 请求拦截
 */
request.interceptors.request.use(
  config => {
    console.log('config' , config)
    // 判断是否有自定义的配置
    if(window.nghttpConfig) {
      let _config = window.nghttpConfig(config)
      if(_config) {
        config = _config 
      }
    }
    return config
  },
  error => {
    console.log('error', error)
    return Promise.reject(new Error(error).message)
  }
)

request.interceptors.response.use(
  response => { 
    return response.data
  },
  error => {
    console.log('error', error)
    return Promise.reject(new Error(error).message)
  }
)

export default request
