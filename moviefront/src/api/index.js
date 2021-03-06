const host = 'http://movie.pqdong.com:10015';
const host2 = 'http://localhost:8888'
const host3 = 'http://26335nw774.qicp.vip'

export default {
  top5(){
    return `${host2}/top5`;
  },
  searchMovie(){
    return `${host2}/searchMovie`;
  },
  getMovieByType(){
    return `${host2}/getMovieByType`;
  },
  getMovieById(){
    return `${host2}/getMovieById`;
  },
  getTopMovie(){
    return `${host2}/getTopMovie`;
  },
  updateMovieScore(){
    return `${host2}/updateMovieScore`;
  },
  getUserRecommendMovie(){
    return `${host2}/getUserRecommendMovie`;
  },
  getUserMovie(){
    return `${host2}/getUserMovie`;
  },
  getRecommendMovie(){
    return `${host2}/getRecommendMovie`;
  },
  getRecommendUser(){
    return `${host2}/getRecommendUser`;
  },
  userRegister() {
    return `${host}/user/register`;
  },
  userLogin() {
    return `${host}/user/login`;
  },
  getUserInfo() {
    return `${host}/user/userInfo`;
  },
  getMovie() {
    return `${host}/movie/list`;
  },
  getRecommend() {
    return `${host}/movie/recommend`;
  },
  getMovieHigh() {
    return `${host}/movie/high`;
  },
  getMovieByTag() {
    return `${host}/movie/listByTag`;
  },
  getMovieInfo() {
    return `${host}/movie/info`;
  },
  getCommentInfo() {
    return `${host}/comment/list`;
  },
  submitComment() {
    return `${host}/comment/submit`;
  },
  putMovie() {
    return `${host}/movie/update`;
  },
  getPerson() {
    return `${host}/person/list`;
  },
  getPersonInfo() {
    return `${host}/person/info`;
  },
  getPersonMovie() {
    return `${host}/movie/person/attend`;
  },
  getMovieTag() {
    return `${host}/movie/tag`;
  },
  sendCode() {
    return `${host}/user/code`;
  },
  logout() {
    return `${host}/user/logout`;
  },
  // 提交用户信息
  putUserInfo() {
    return `${host}/user/userInfo`;
  },
  // 修改用户手机号码
  changePhone() {
    return `${host}/user/phone`;
  },
  // 修改用户密码
  changePass() {
    return `${host}/user/password`;
  },
  // 修改用户邮箱
  changeEmail() {
    return `${host}/user/email`;
  },
  getMessage() {
    return `${host}/message/user/get`;
  },
};
