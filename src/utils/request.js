/*import axios from 'axios'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    // baseURL: 'http://127.0.0.1:8888/ruoyi',
    baseURL: '/api',
    // changeOrigin: true,
    // 超时
    timeout: 10000
})*/

// 导入axios
import axios from 'axios'
import router from '../router'
// eslint-disable-next-line standard/object-curly-even-spacing
import { Loading } from 'element-ui'
import { Message } from 'element-ui'
// 进行一些全局配置
// 公共路由(网络请求地址)测试环境
//第一个用来本地运行
// const url='/'
//第二个用来打包发布上线
// const url='http://localhost:8080/api'
const url='/api'
axios.defaults.baseURL = url
// 请求响应超时时间
axios.defaults.timeout = 30000
// 在请求接口前创建loading参数
const options = {
    text: '载入中...',
    background: 'rgba(255,255,255,0.6)',
    spinner: 'el-icon-loading',
    lock: true,
    // target指定需要覆盖的 DOM 节点
    target: '#app'
};
let loadingInstance;
// 封装自己的get/post方法
export default {
    baseURL: axios.defaults.baseURL,
    get(path = '', data = {}, header = {}) {
        // 发起请求前先判断之前的loading是否存在
        if (loadingInstance) {
            loadingInstance.close();
        }
        // 开启loading
        loadingInstance = Loading.service(options);
        return new Promise(function (resolve, reject) {
            axios.get(path, {
                headers: header,
                params: data
            })
                .then(function (response) {
                    // 按需求来，这里我需要的是response.data，所以返回response.data，一般直接返回response
                    if (response.data.code == 401) {
                        localStorage.clear()
                        router.push('/')
                        Message({
                            message: '长时间未操作，请重新登录！',
                            type: 'warning'
                        })
                    }
                    loadingInstance.close();
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error)
                    loadingInstance.close();
                })
        })
    },
    CSMGet(path = '', data = {}, header = {}) {
        // 发起请求前先判断之前的loading是否存在
        if (loadingInstance) {
            loadingInstance.close();
        }
        // 开启loading
        loadingInstance = Loading.service(options);
        return new Promise(function (resolve, reject) {
            axios.get(path, {
                headers: header,
                body: data
            })
                .then(function (response) {
                    // 按需求来，这里我需要的是response.data，所以返回response.data，一般直接返回response
                    if (response.data.code == 401) {
                        localStorage.clear()
                        router.push('/')
                        Message({
                            message: '长时间未操作，请重新登录！',
                            type: 'warning'
                        })
                    }
                    loadingInstance.close();
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error)
                    loadingInstance.close();
                })
        })
    },
    post(path = '', data = {}, header = {}) {
        // 发起请求前先判断之前的loading是否存在
        if (loadingInstance) {
            loadingInstance.close();
        }
        // 开启loading
        loadingInstance = Loading.service(options);
        return new Promise(function (resolve, reject) {
            axios.post(path, data, {
                headers: header
            })
                .then(function (response) {
                    if (response.data.code == 401) {
                        localStorage.clear()
                        router.push('/')
                        Message({
                            message: '长时间未操作，请重新登录！',
                            type: 'warning'
                        })
                    }
                    resolve(response.data)
                    loadingInstance.close();
                })
                .catch(function (error) {
                    reject(error)
                    loadingInstance.close();
                })
        })
    },
    export(path = '', data = {}, header = {}) {
        // 发起请求前先判断之前的loading是否存在
        if (loadingInstance) {
            loadingInstance.close();
        }
        // 开启loading
        loadingInstance = Loading.service(options);
        return new Promise(function (resolve, reject) {
            axios.post(path, data, {
                headers: header,
                responseType: 'blob'
            })
                .then(function (response) {
                    if (response.data.code == 401) {
                        localStorage.clear()
                        router.push('/')
                        Message({
                            message: '长时间未操作，请重新登录！',
                            type: 'warning'
                        })
                    }
                    resolve(response)
                    loadingInstance.close();

                })
                .catch(function (error) {
                    reject(error)
                    loadingInstance.close();

                })
        })
    },
}

