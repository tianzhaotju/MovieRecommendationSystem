import api from './index';
import axios from '../http';

const headers = {
  'Content-Type': 'application/json',
  // 这里有一个很玄学的问题
  token: localStorage.getItem('token'),
};
export default {
  top5(req) {
    return axios.get(api.top5(), { params: {num:req.num} }, { headers });
  },
  searchMovie(req) {
    return axios.get(api.searchMovie(), { params: { count:req.count , tag: req.tags[0] } }, { headers });
  },
  getUserRecommendMovie(req) {
    return axios.get(api.getUserRecommendMovie(), { params: { count:req.count ,id: req.id, tags: req.tags} }, { headers });
  },
  getUserMovie(req) {
    return axios.get(api.getUserMovie(), { params: { count:req.count ,id: req.id} }, { headers });
  },
  getRecommendMovie(req) {
    return axios.get(api.getRecommendMovie(), { params: { count:req.count ,id: req.id} }, { headers });
  },
  getRecommendUser(req) {
    return axios.get(api.getRecommendUser(), { params: {id: req.id} }, { headers });
  },
  getMovieByType(req) {
    return axios.get(api.getMovieByType(), { params: { count:req.count ,type: req.tags[0] } }, { headers });
  },
  getMovieById(req) {
    return axios.get(api.getMovieById(), { params: { id:req.movieId } }, { headers });
  },
  getTopMovie(req) {
    return axios.get(api.getTopMovie(), { params: { count:req.count ,type: req.tags[0], year:req.years[0] } }, { headers });
  },
  updateMovieScore(req) {
    return axios.get(api.updateMovieScore(), { params: { id:req.id ,votes: req.votes, score:req.score } }, { headers });
  },
  getPerson(num) {
    return axios.get(api.getPerson(), { params: { page: num, size: 9 } }, { headers });
  },
  getMovie() {
    return axios.get(api.getMovie(), { params: { size: 12 } }, { headers });
  },
  getRecommend() {
    const info = localStorage.getItem('user');
    return axios.post(api.getRecommend(), info, { headers });
  },
  getMovieHigh() {
    return axios.get(api.getMovieHigh(), { headers });
  },
  getMovieList(info) {
    return axios.post(api.getMovieByTag(), JSON.stringify(info), { headers });
  },
  getMovieInfo(id) {
    return axios.get(api.getMovieInfo(), { params: { movieId: id } }, { headers });
  },
  getCommentList(info) {
    headers.token = localStorage.getItem('token');
    return axios.post(api.getCommentInfo(), JSON.stringify(info), { headers });
  },
  submitComment(info) {
    headers.token = localStorage.getItem('token');
    return axios.post(api.submitComment(), JSON.stringify(info), { headers });
  },
  putMovie(info) {
    headers.token = localStorage.getItem('token');
    return axios.post(api.putMovie(), JSON.stringify(info), { headers });
  },
  getPersonInfo(id) {
    return axios.get(api.getPersonInfo(), { params: { personId: id } }, { headers });
  },
  getPersonMovie(name) {
    return axios.get(api.getPersonMovie(), { params: { personName: name } }, { headers });
  },
  userRegister(info) {
    return axios.post(api.userRegister(), JSON.stringify(info), { headers });
  },
  movieTags() {
    return axios.get(api.getMovieTag(), { headers });
  },
  userLogin(info) {
    return axios.post(api.userLogin(), JSON.stringify(info), { headers });
  },
  getUserInfo(info) {
    return axios.get(api.getUserInfo(), { params: { token: info } }, { headers });
  },
  sendCode(phone) {
    return axios.get(api.sendCode(), { params: { phone } }, { headers });
  },
  logout() {
    headers.token = localStorage.getItem('token');
    return axios.post(api.logout(), null, { headers });
  },
  putUserInfo(userInfo) {
    headers.token = localStorage.getItem('token');
    return axios.post(api.putUserInfo(), JSON.stringify(userInfo), { headers });
  },
  changePhone(phone) {
    return axios.put(api.changePhone(), JSON.stringify(phone), { headers });
  },
  changePass(password) {
    return axios.put(api.changePass(), JSON.stringify(password), { headers });
  },
  getMessage() {
    return axios.get(api.getMessage(), { headers });
  },
};
