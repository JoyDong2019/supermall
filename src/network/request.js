import axios from 'axios';
// export function request(config, success, failure) {
//     const instance = axios.create({
//         baseURL: 'http://123.207.32.32:8000',
//         timeout: 1000,
//         // headers:
//     })
//     instance(config).then(res => {

//         success(res)
//     }).catch(err => {

//         failure(err)
//     })
// }
// 2 参数仅为一个对象
// export function request(config) {
//     const instance = axios.create({
//         baseURL: 'http://123.207.32.32:8000',
//         timeout: 1000,
//         // headers:
//     })
//     instance(config.config).then(res => {

//         config.success(res)
//     }).catch(err => {

//         config.failure(err)
//     })
// }
//  3 用Promise
// export function request(config) {

//     return new Promise((resolve, reject) => {
//         // 1 创建axios实例
//         const instance = axios.create({
//                 baseURL: 'http://123.207.32.32:8000',
//                 timeout: 1000,
//                 // headers:
//             })
//             // 2 发送真正的网络请求
//         instance(config)
//             .then(res => resolve(res))
//             .catch(err => reject(err))
//     })
// }
//  4  最终版本 简化的Promise
export function request(config) {


    // 1 创建axios实例
    const instance = axios.create({
            // baseURL: 'http://123.207.32.32:8000',
            baseURL: 'http://152.136.185.210:7878/api/m5',

            timeout: 5000,
            // headers:
        })
        // 2 axios的拦截器
        // 2.1 请求拦截
    instance.interceptors.request.use(config => {
            // console.log('拦截器的config为', config);
            // 1 比如config中的一些信息不符合服务器要求
            // 2 比如每次发送网络请求时，都希望在界面中显示一个请求的图标
            // 3 某些网络请求（比如登陆token）必须携带一些特殊的信息
            return config; //一定要return回config 否则无法继续请求
        }, err => {
            console.log(err);
        })
        // 2.2 响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data
    }, err => {
        console.log(err);
    })

    // 3 发送真正的网络请求
    // 由于axios本身就用promise实现 自己就有then catch 
    // instancce()就是个promise对象
    return instance(config)
        // .then(res => resolve(res))
        // .catch(err => reject(err))

}