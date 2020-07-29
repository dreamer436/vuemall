import axios from 'axios'
export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
        baseURL:'http://152.136.185.210:8000/api/n3',
        timeout:5000
    })
    // axios拦截器
    // 2.1请求拦截 请求失败
    instance.interceptors.request.use( config => {
        return config;
    }, err => {

    });

    // 2.2响应拦截 请求成功
    instance.interceptors.response.use( res => {
        return res.data
    }, err => {

    });
    // 3.真正网络请求 返回Promise 其他地方调用直接使用.then.catch
    return instance(config)
    
}