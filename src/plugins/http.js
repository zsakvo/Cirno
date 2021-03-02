import axios from 'axios'
import crypto from 'crypto'

axios.defaults.timeout = 1500
axios.defaults.baseUrl = ''

let vm = null

function decrypt(data, key) {
  if (key == null) {
    key = crypto
      .createHash('sha256')
      .update('zG2nSeEfSHfvTCHy5LCcqtBbQehKNLXn')
      .digest()
  } else {
    key = crypto
      .createHash('sha256')
      .update(key)
      .digest()
  }
  let decipher = crypto.createDecipheriv('aes-256-cbc', key, new Uint8Array(16))
  decipher.setAutoPadding(false)
  let decrypted = decipher.update(data, 'base64', 'utf8')
  return decrypted
}

let mixin = {
  headers: {
    'Content-Type': 'application/json;charset-utf-8'
    // 'User-Agent': 'Android  com.kuangxiangciweimao.novel  fake_server_by_scf'
  },
  timeout: 30000,
  withCredentials: true, //跨域请求是否使用凭证
  urlParas: {
    app_version: '2.7.017',
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
  let baseUrl = window.localStorage.getItem('baseUrl')
  let url = baseUrl ? baseUrl + obj.url : 'https://app.hbooker.com' + obj.url

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
        if (baseUrl.indexOf('app.hbooker.com') != -1) {
          res = decrypt(res)
          res = unescape(res.replace(/\\u/g, '%u'))
          let regExp = /\{(.+)\}/g
          res = res.match(regExp)[0]
        }
        if (typeof res === 'string') {
          //有些接口回来的数据比较奇葩……
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
