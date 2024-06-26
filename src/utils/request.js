import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    
    
    // config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    config.headers['token'] = 'token'  // 设置请求头

    // 添加请求头等前置处理
    // config.headers['Authorization'] = 'Bearer' + ' ' + localStorage.getItem('token')
    // console.log( 1 );
    return config;
  },
  error => {
    // 请求错误处理
    // console.log('Request Error:', error)
    return Promise.reject(error);
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    let res = response.data;
     // 兼容服务端返回的字符串数据
     if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
  }
    // 响应后处理
    // console.log( 2 );
      return res;
  },
  error => {
    // console.log('Response Error:', error)
    return Promise.reject(error)
  }
)

export default service
