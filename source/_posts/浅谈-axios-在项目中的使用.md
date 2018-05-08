---
title: 浅谈 axios 在项目中的使用
date: 2018-04-14 15:47:13
tags:
    - axios
---

[axios](https://github.com/axios/axios) 是Vue官方推荐的Request库。

**特性**

- 浏览器端发起XMLHttpRequests请求
- Node端发起http请求
- 支持Promise API
- 拦截请求和相应
- 转化请求和响应数据
- 取消请求
- 自动转化json数据
- 客户端支持抵御 XSRF

**安装**

> npm install axios --save

**API**

[axios-api](https://github.com/axios/axios#axios-api)

**使用**

接下来简单介绍一下axios在vue项目中的使用。

```js
// ajax.js

import axios from 'axios'

// 提示信息处理
import { Message } from 'element-ui'

// token 
const AUTH_TOKEN = ''

// config default
axios.defaults.baseURL = 'https://api.example.com'
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 100000

// request 拦截器
axios.interceptors.request.use(
    config => {
        // Do something before request is sent
        if(config.method === 'get') config.url += `?t=${Date.now()}`
        return config
    }, error => Promise.reject(error)
)

// response 拦截器
axios.interceptors.response.use(
    response => {
        // Do something with response data
        return response
    }, error => {
        // Do something with response error
        try {
            checkStatus(error)
            return Promise.reject(error)
        } catch (e) {
            return Promise.reject(error)
        }
    }
)

const checkStatus = error => {
    if (error.status_code >= 500) {
        error.message = '服务器出小差了~~'
        Message.error(error.message)
    }
    
    // 前后端约定错误状态码
    if (error.status_code === 406) {
        Message.warning(error.message)
    }
}

// 更新 token
export const updateHeaderToken = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const urlPattern = (url, arg) => ({
    url: url.replace(/:[a-zA-Z]+/g, () => arg.shift()),
    params: arg.length ? arg[0] : null
})

/**
 * http GET
 * @param {*} url String
 * @param {*} params Object
 */
export const GET = (url, params) => axios.get(url, params ? {
    params
} : params)

/**
 * http POST
 * @param {*} url String
 * @param {*} body Object
 */
export const POST = (url, body) => axios.post(url, body)

/**
 * http PUT
 * @param {*} url String
 * @param {*} body Object
 */
export const PUT = (url, body) => axios.put(url, body)

/**
 * http DELETE
 * @param {*} url String
 * @param {*} params Object
 */
export const DELETE = (url, params) => axios.delete(url, params ? {
    params
} : params)

/**
 * REQUEST
 * @param {*} path
 * @param {*} args
 */
export const REQUEST = (path, ...args) => {
    const {
        url,
        params
    } = urlPattern(path, args)
    return axios(url, params)
}

export default axios

```

**Request Config**

```js
{
  // `url` is the server URL that will be used for the request
  url: '/user',

  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000,

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see lib/adapters/README.md).
  adapter: function (config) {
    /* ... */
  },

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `maxContentLength` defines the max size of the http response content in bytes allowed
  maxContentLength: 2000,

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' defines the hostname and port of the proxy server
  // Use `false` to disable proxies, ignoring environment variables.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing
  // `Proxy-Authorization` custom headers you have set using `headers`.
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  cancelToken: new CancelToken(function (cancel) {
  })
}
```
说明
- url —— 用来向服务器发送请求的url
- method —— 请求方法，默认是GET方法
- baseURL —— 基础URL路径，假如url不是绝对路径，如https://some-domain.com/api/v1/login?name=jack,那么向服务器发送请求的URL将会是baseURL + url。
- transformRequest —— transformRequest方法允许在请求发送到服务器之前修改该请求，此方法只适用于PUT、POST和PATCH方法中。而且，此方法最后必须返回一个string、ArrayBuffer或者Stream。
- transformResponse —— transformResponse方法允许在数据传递到then/catch之前修改response数据。此方法最后也要返回数据。
- headers —— 发送自定义Headers头文件，头文件中包含了http请求的各种信息。
- params —— params是发送请求的查询参数对象，对象中的数据会被拼接成url?param1=value1&param2=value2。
- paramsSerializer —— params参数序列化器。
- data —— data是在发送POST、PUT或者PATCH请求的数据对象。
- timeout —— 请求超时设置，单位为毫秒
- withCredentials —— 表明是否有跨域请求需要用到证书
- adapter —— adapter允许用户处理更易于测试的请求。返回一个Promise和一个有效的response
- auth —— auth表明提供凭证用于完成http的身份验证。这将会在headers中设置一个Authorization授权信息。自定义Authorization授权要设置在headers中。
- responseType —— 表示服务器将返回响应的数据类型，有arraybuffer、blob、document、json、text、stream这6个类型，默认是json类似数据。
- xsrfCookieName —— 用作 xsrf token 值的 cookie 名称
- xsrfHeaderName —— 带有 xsrf token 值 http head 名称
- onUploadProgress —— 允许在上传过程中的做一些操作
- onDownloadProgress —— 允许在下载过程中的做一些操作
- maxContentLength —— 定义了接收到的response响应数据的最大长度。
- validateStatus —— validateStatus定义了根据HTTP响应状态码决定是否接收或拒绝获取到的promise。如果 validateStatus 返回 true (或设置为 null 或 undefined ),promise将被接收;否则,promise将被拒绝。
- maxRedirects —— maxRedirects定义了在node.js中redirect的最大值，如果设置为0，则没有redirect。
- httpAgent —— 定义在使用http请求时的代理
- httpsAgent —— 定义在使用https请求时的代理
- proxy —— proxy定义代理服务器的主机名和端口，auth
- cancelToken —— cancelToken定义一个 cancel token 用于取消请求

**Response Schema**

```js
{
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {}
}
```


