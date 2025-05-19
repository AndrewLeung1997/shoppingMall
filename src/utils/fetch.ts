import axios from 'axios'

const baseURL = "https://backend-dot-smartracer228-450909.df.r.appspot.com"
//const baseURL = "http://localhost:8080";

export const srAxios = axios.create({
  baseURL
})
srAxios.interceptors.request.use(function (config) {
  if (config.addBearer) {
    config.headers = {
      Authorization: 'Barrer ' + sessionStorage.getItem('access_token')
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export const fetchApi = (url: string, params: any) => {
  if (url.startsWith("/"))
    return fetch(baseURL + url, {
      ...params,
      origin: true,
      credentials: "include",
    });
  else return fetch(url, ...params)
}


