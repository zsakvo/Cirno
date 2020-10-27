import axios from 'axios'

axios.defaults.timeout = 1500
axios.defaults.baseUrl = ''

let vm = null

let mixin = {
  headers: {
    'Content-Type': 'application/json;charset-utf-8'
    // 'User-Agent': 'Android  com.kuangxiangciweimao.novel  fake_server_by_scf'
  },
  timeout: 30000,
  withCredentials: true, //跨域请求是否使用凭证
  urlParas: {
    app_version: '2.5.016',
    device_token: 'ciweimao_scf_server'
  }
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
/**
 * 封装get方法
 * @param optioons
 */

function get(obj) {
  let urlParas = Object.assign({}, mixin.urlParas, obj.urlParas, {
    login_token: window.localStorage.getItem('login_token'),
    account: window.localStorage.getItem('account')
  })
  let headers = Object.assign({}, mixin.headers, obj.headers)
  let url = window.localStorage.getItem('baseUrl') + obj.url

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: headers,
        params: urlParas,
        timeout: mixin.timeout,
        withCredentials: mixin.withCredentials
      })
      .then(response => {
        let res = response.data
        //有些接口回来的数据比较奇葩……
        if (typeof res === 'string') {
          res = eval('(' + res + ')')
        }
        if (res['code'] == 100000) {
          resolve(res)
        } else {
          if (url.indexOf('get_meta_data') != -1) {
            resolve(res)
          } else {
            vm.prototype.$message.error(res.tip)
          }
        }
      })
      .catch(err => {
        console.log(err)
        //请求出错了……
        //
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
  let url = options.baseUrl + options.url
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
          if (data.success) {
            resolve(data)
          } else {
            // 请求失败了
            vm.prototype.$message.error(data.tip)
            reject(data)
          }
        },
        err => {
          //请求出错了
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
