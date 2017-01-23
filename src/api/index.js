import axios from 'axios'

const baseUrl = 'http://127.0.0.1:7000/home/v1'
export default {
  getPostList (params) {
    return axios.get(`${baseUrl}/post?type=${params.type}&pageIndex=${params.pageIndex}&pageSize=${params.pageSize}`)
  },
  getChannel (params) {
    return axios.get(`${baseUrl}/channel`)
  },
  getFriend (params) {
    return axios.get(`${baseUrl}/friend`)
  },
  getPost (params) {
    return axios.get(`${baseUrl}/findModel?_id=${params._id}&model=${params.model}`)
  },
  getLibrary (params) {
    return axios.get(`${baseUrl}/library`)
  },
  getLeave (params) {
    return axios.get(`${baseUrl}/leave`)
  },
  postLeave (params) {
    return axios.post(`${baseUrl}/leave`, params)
  },
  getComment (params) {
    return axios.get(`${baseUrl}/comment?_id=${params._id}`)
  },
  postComment (params) {
    return axios.post(`${baseUrl}/sendComment`, params)
  },
  getReadPost (params) {
    return axios.get(`${baseUrl}/readPost`)
  },
  getRecentPost (params) {
    return axios.get(`${baseUrl}/recentPost`)
  },
  getCorrelationPost (params) {
    return axios.get(`${baseUrl}/correlationPost?type=${params.type}&_id=${params._id}`)
  },
  search (params) {
    return axios.get(`${baseUrl}/search2?object=${JSON.stringify(params)}`)
  },
  clickView (params) {
    return axios.get(`${baseUrl}/clickView?_id=${params._id}`)
  }
}
