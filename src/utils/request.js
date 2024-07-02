import axios from 'axios'
import router from "@/router";

// 创建可一个新的axios对象
const request = axios.create({
    baseURL: 'http://localhost:8080',   // 后端的接口地址
    timeout: 30000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // 先从localStorage获取用户信息字符串
    let user = localStorage.getItem("honey-user") || '{}';
    // 将字符串转换为JSON对象
    user = JSON.parse(user);
    // 将用户的token设置到请求头中
    config.headers['token'] = user.token;  // 正确设置请求头
    return config
}, error => {
    console.error('request error: ' + error) // for debug
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;

        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        if (res.code === '401') {
            router.push('/login')
        }
        return res;
    },
    error => {
        // console.error('response error: ' + error) // for debugs
        return Promise.reject(error)
    }
)


export default request