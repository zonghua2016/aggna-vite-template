import axios from 'axios'
import { commonParam } from '../interface'

// 响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      error.message = '连接到服务器失败'
    }
    // message.error(error)
    return Promise.resolve(error.response)
  }
)

// 设置默认请求头
// axios.defaults.headers = {
//   'X-Requested-With': 'XMLHttpRequest',
//   "Access-Control-Allow-Origin": "*",
// }

// axios.defaults.timeout = 100000
// axios.defaults.withCredentials = true

export default class Axios {
  static get(url: string, param: commonParam, headers: commonParam = {}) {
    const res = this.generatorRequestUrl(url, param)
    url = res.url
    param = res.param
    return new Promise(resolve => {
      axios({
        method: 'get',
        url,
        ...param,
        ...headers,
      }).then(res => {
        resolve(res)
      })
    })
  }

  static post(url: string, param: commonParam, headers: commonParam = {}) {
    const res = this.generatorRequestUrl(url, param);
    url = res.url;
    param = res.param;
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url,
        data: param,
        headers,
      }).then(res => {
        resolve(res)
      })
    })
  }
  /**
   * @description: 拼接请求参数到路径
   * @param url {String} 请求路径
   * @param param {Object} 请求参数
   */
  private static generatorRequestUrl<commonParam>(url: string, param: commonParam) {
    let paramLink = "";
    for (const key in param) {
      const p = param[key];
      paramLink += `${key}=${p}&`;
    }
    paramLink = paramLink.slice(0, paramLink.length - 1);
    return { url: `${url}?${paramLink}`, param };
  }
}