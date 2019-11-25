import axios from "axios"
// import { BASE_URL } from "@/assets/consts/urls"

let services
let uploadServices
let downloadServices
let publicParams = {}

function httpService(service, contentType) {
  service.interceptors.request.use(
    request => {
      if (request.method === "get") {
        request.params = {
          // 公用参数
          ...publicParams,
          ...request.params,
          // 当前时间用来去除ie缓存
          t: Date.now()
        }
      }
      if (
        request.method === "post" &&
        contentType !== "multipart/form-data;charset=UTF-8"
      ) {
        request.data = {
          // 公用参数
          ...publicParams,
          ...request.data,
          // 当前时间用来去除ie缓存
          t: Date.now()
        }
      }
      return request
    },
    error => {
      console.error("Request Error: " + error)
      return Promise.reject(error)
    }
  )
}
/**
 *
 * @param {axios配置文件} axiosConfig
 * @param {接口地址} baseUrl
 * @param {请求头部参数} headers
 */
function createService(axiosConfig = {}, baseUrl = "", headers = {}) {
  let params = {
    baseURL: baseUrl,
    timeout: 60000,
    header: {
      ["X-Requested-With"]: "XMLHttpRequest",
      ...publicParams,
      ...headers
    },
    ...axiosConfig
  }
  const service = axios.create(params)
  httpService(service, headers["Content-Type"])
  return service
}
/**
 *
 * @param {接口需要传递的公用参数} params
 */
function initPublicParams(params = {}) {
  if (process.env.NODE_ENV === "development") {
    let paramsInStorage = localStorage.getItem("accountParams")
    if (paramsInStorage) {
      params = JSON.parse(paramsInStorage)
    }
  }
  publicParams = params
  services = createService()
  uploadServices = createService({}, undefined, {
    "Content-Type": "multipart/form-data;charset=UTF-8"
  })
  downloadServices = createService({ responseType: "blob" })
}
/**
 *
 * 带进度条的下载请求
 */
function downloadServicesWithProgress(payload) {
  return createService({
    responseType: "blob",
    ...payload
  })
}

export {
  services,
  downloadServices,
  downloadServicesWithProgress,
  initPublicParams,
  uploadServices
}
