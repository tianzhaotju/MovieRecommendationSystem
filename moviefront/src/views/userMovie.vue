<template>
  <div>
    <div>
      <el-card class="moviecard">
      <div class="movieintroduce">该用户喜欢看哪些电影</div>
      <div class="cardContain">
      <div class="wrapper-card2">
        <div class="card" v-for="(item, key) in movieList" :key="key">
          <!--          引入资源防止403-->
          <meta name="referrer" content="no-referrer"/>
          <img :src="item.cover" class="image" @click="getMovieDetail2(item.movieId,item.cover)">
          <div>
            <p style="white-space: pre-wrap;">{{item.name}}    </p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-button class="editt" @click="preMoviePage()">上一页</el-button>
      <el-button type="primary" class="editt">{{this.movie_count}}</el-button>
      <el-button class="editt" >{{this.movie_count+1}}</el-button>
      <el-button class="editt" >{{this.movie_count+2}}</el-button>
      <el-button class="editt" @click="nextMoviePage()">下一页</el-button>
    </div>
    </el-card>
    </div>
  </div>
</template>

<script>
import fetch from '../api/fetch';

export default {
  data() {
    return {
      movieList:[],
      movie_count:1,
    };
  },
  mounted() {
    this.getUserRecommendMovie();
  },
  methods: {
    getMovieDetail2(id,cover) {
      localStorage.setItem('movieId', id);
      localStorage.setItem('cover', cover);
      this.$router.push({ name: 'movieInfo' });
    },
    preMoviePage() {
      if (this.movie_count > 1) {
        this.movie_count = this.movie_count - 1;
      }
      this.getUserRecommendMovie();
    },
    nextMoviePage() {
      this.movie_count = this.movie_count + 1;
      this.getUserRecommendMovie();
    },
    getUserRecommendMovie() {
      const uid = localStorage.getItem('userId');
      fetch.getUserMovie({
        count: this.movie_count,
        id: uid
      }).then((res) => {
        this.movieList = JSON.parse(res.data.m_list);
        console.log(this.movieList);
      });
    },
  },
};
</script>


<style>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  div .moviecard {
    width: 1000px;
    margin: 20px auto auto auto;
  }

  .avatar {
    float: left;
    width: 126px;
    height: 140px;
  }

  .title {
    font-size: 21px;
  }

  .introduce {
    margin-left: 140px;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .movieintroducet {
    /*margin-left: 0px;*/
    margin: 15px auto 15px auto;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .movieintroducet p {
    margin: 5px;
  }

  .introduce p {
    margin: 8px;
  }

  p span {
    margin: 14px;
  }

  .movieintroduce {
    border-left: 5px solid #888;
    text-align: left;
    padding-left: 8px;
  }

  .moviecontent {
    height: 100px;
    margin: 15px auto 15px auto;
    text-align: left;
  }


  .moviebtn {
    float: right;
    margin-bottom: 20px;
  }

  .combtn {
    float: left;
    margin-bottom: 20px;
  }

  .combtn2 {
    float: left;
    margin-top: 5px;
    margin-bottom: 20px;
  }

  .scorec {
    margin: 0px auto auto 0px;
  }

  .cardContain {
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .newsContain {
    padding-top: 1px;
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .picContain {
    margin-right: 10px;
    perspective: 1000px;
  }

  .picContain:hover .flipper, .picContain.hover .flipper {
    transform: rotateY(180deg);
  }

  .picContain, .itemPic, .back {
    width: 80px;
    height: 80px;
  }

  .flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
  }

  .newsItem {
    display: flex;
    justify-content: flex-start;
    width: 1000px;
    margin: auto;
    height: 114px;
    text-align: left;
    color: #5a5a5a;
    font-weight: 500;
    padding-top: 15px;
    border-bottom: 1px solid #ededed;
  }

  .itemPic, .back {
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    background: #cc0000;
    text-align: center;
    color: white;
    font-weight: 500;
    line-height: 80px;
    white-space: nowrap;
  }

  .itemPic {
    z-index: 2;
  }

  .back {
    transform: rotateY(180deg);
  }

  .footer {
    width: 100%;
    height: 100px;
    background: black;
    padding-top: 20px
  }

  .footer a {
    color: white;
    text-decoration: none;
  }

  .aboutus {
    width: 100%;
    height: 500px;
    background: url("https://ydschool-video.nosdn.127.net/158480509232652112_AaOXxSky.jpg") no-repeat;
    background-size: 100% 100%;
    filter: grayscale(70%);
    opacity: 0.7;
    color: white;
    font-weight: 600;
    padding-top: 60px;
  }

  .aboutus p {
    margin-top: 30px;
    font-size: 18px;
  }

  #aboutusInfo {
    margin-top: 80px;
    animation-delay: 1s
  }

  .cardBox {
    position: relative;
    width: 1200px;
    margin: 20px auto 30px auto;
    box-shadow: 0 10px 15px #888;
    border-radius: 6px;
  }

  .wrapper-card {
    width: 1200px;
    height: 1000px;
    margin: 30px auto auto auto;
    padding-top: 30px;
  }

  .wrapper-card .card {
    color: #07111B;
    font-size: 16px;
    width: 230px;
    height: 243px;
    float: left;
    margin: 30px;
    border-radius: 6px;
  }

  .wrapper-card .card:hover {
    transform: translateY(-5px);
    transition: 3ms;
    box-shadow: 5px 5px 10px #888;
  }

  .wrapper-card .image {
    border-radius: 6px 6px 0 0;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    border-radius: 6px;
  }

  .boxImg {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }

  .divisionx {
    width: 90%;
    margin: 10px auto;
    text-align: left;
    padding-left: 10px;
    color: #5a5a5a;
  }

  .footer img {
    width: 25px;
    height: 25px;
    margin-right: 10px
  }

  .footer span {
    margin-right: 20px;
  }

  .recommandInfo p {
    margin-bottom: 6px;
  }

  .el-progress__text {
    font-size: 16px !important;
    text-align: center !important;
  }

  .el-carousel-item {
    display: flex;
    justify-content: space-around;
  }

  .el-carousel {
    width: 1200px;
    margin: 0 auto;
  }

  .mytable {
    width: 100%;
    height: 700px;
  }

  .progress2 {
    width: 182px;
    border: 0;
  }

  .editt {
    margin: 0px auto auto 0px;
  }

  .wrapper-card2 {
    width: 1000px;
    height: 700px;
    margin: 20px auto auto auto;
    padding-top: 20px;
  }

  .wrapper-card2 .card {
    color: #07111B;
    font-size: 16px;
    width: 230px;
    height: 243px;
    float: left;
    margin: 45px;
    border-radius: 6px;
  }

  .wrapper-card2 .card:hover {
    transform: translateY(-5px);
    transition: 3ms;
    box-shadow: 5px 5px 10px #888;
  }

  .wrapper-card2 .image {
    border-radius: 6px 6px 0 0;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    border-radius: 6px;
  }

</style>
