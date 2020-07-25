import axios from 'axios'

axios.defaults.timeout = 1500
axios.defaults.baseUrl = ''

let vm = null

const mixin = {
  baseUrl: process.env.VUE_APP_SERVER_URL, //url前缀
  loadingFlag: true,
  header: { 'Content-Type': ' application/json' },
  timeout: 30000,
  withCredentials: true //跨域请求是否使用凭证
}
// http request 拦截
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求地址出错'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
      }
    }
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param optioons
 */

function get(obj) {
  let options = mixin
  options = Object.assign({}, options, obj)
  let url = options.baseUrl + options.url

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: options.header,
        params: options.urlParas,
        timeout: options.timeout,
        withCredentials: options.withCredentials
      })
      .then(response => {
        let data = response.data
        if (!data.failed) {
          if (data.success) {
            resolve(data)
          } else {
            vm.prototype.$message.error(data.tip)
            reject(data)
          }
        } else {
          //请求失败了……
        }
      })
      .catch(err => {
        //请求出错了……
        vm.prototype.$message.error(err.message)
        reject(err)
      })
  })
}
/**
 *
 * @param {baseUrl  从配置中取 default:从配置中取
 * header 默认以表单提交，可替换
 * timeout：超时设置15000
 * para: 参数
 * url: 访问地址
 * } obj
 *
 */

function post(obj) {
  let options = mixin
  options = Object.assign({}, options, obj)
  const parameter = options.paras
  let url = options.url
  const self = this
  return new Promise((resolve, reject) => {
    axios
      .post(url, parameter, {
        headers: options.header,
        params: options.urlParas,
        timeout: options.timeout,
        withCredentials: options.withCredentials,
        cancelToken: new axios.CancelToken(function executor(c) {
          //加入请求取消功能
          self.axiosCancel = {}
          self.axiosCancel[options.url] = c
        })
      })
      .then(
        response => {
          let data = response.data
          if (!data.failed) {
            resolve(data)
          } else {
            // 请求失败了
            reject(data)
          }
        },
        err => {
          //请求出错了
          reject(err)
        }
      )
  })
}

function put(options) {
  return new Promise((resolve, reject) => {
    axios.put(options.url, options.data).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}
const $cirnoHttp = {
  install,
  version: '0.0.1'
}

function install(Vue) {
  vm = Vue
  if (install.installed) return
  install.installed = true
  Vue.prototype.$post = post
  Vue.prototype.$get = get
  Vue.prototype.$put = put
}
export default $cirnoHttp
