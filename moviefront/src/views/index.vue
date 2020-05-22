<template>
  <div>
    <div class="indexContain">
      <div class="cardBox">
        <el-carousel trigger="click" height="400px" style="position: sticky;">
          <el-carousel-item v-for="(item, key) in crouselImg" :key="key">
            <img :src="item.img" class="boxImg">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div v-show="!isLogin" class="division"><h3>为您推荐</h3>
      <h3 style="color: #888;font-weight: 400">--- RECOMMENDMOVIES ---</h3></div>
    <div v-show="!isLogin" class="cardContainx">
      <div class="wrapper-cardx">
        <div class="card" v-for="(item, key) in recommendList" :key="key">
          <!--          引入资源防止403-->
          <meta name="referrer" content="no-referrer"/>
          <img :src="item.cover" class="image" @click="getMovieDetail(item.movieId)">
          <div>
            <p style="white-space: pre-wrap;">{{item.name}}    </p>
          </div>
        </div>
      </div>
    </div>
    <div class="division"><h3>电影资源</h3>
      <h3 style="color: #888;font-weight: 400">--- HOTMOVIES ---</h3></div>
    <div class="cardContain">
      <div class="wrapper-card">
        <div class="card" v-for="(item, key) in movieList" :key="key">
<!--          引入资源防止403-->
          <meta name="referrer" content="no-referrer"/>
          <img :src="item.cover" class="image" @click="getMovieDetail(item.movieId)">
          <div>
            <p style="white-space: pre-wrap;">{{item.name}}    </p>
          </div>
        </div>
      </div>
    </div>

    <!--演员资源-->
    <div class="division">
      <h3>演员资源</h3>
      <h3 style="color: #888;font-weight: 400">--- PERSONS ---</h3>
    </div>
    <div class="newsContain">
      <div class="temp">
<!--        @click="personDetail(item.id)-->
        <div class="newsItem" v-for="(item, key) in personList" :key="key" @click="getPersonDetail(item.id, item.name)">
                <div class="picContain" ontouchstart="this.classList.toggle('hover');">
                  <meta name="referrer" content="no-referrer"/>
                  <img :src=item.avatar height="75" width="75">
              </div>
          <div>
            <p style="white-space: pre-wrap;">姓名：{{item.name}}          性别：{{item.sex}}          地点：{{item.birthPlace}}       别名：{{item.nameZn}}</p>
            <p style="margin-top:25px">职业： {{item.profession}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="division"><h3>关于我们</h3>
      <h3 style="color: #888;font-weight: 400">--- ABOUT ---</h3></div>
    <div class="aboutus">
      <div id="aboutusInfo">
        <p style="font-size: 200%">基于大数据的电影推荐系统</p>
        <p style="font-size: 200%">为您推荐最好的电影，带给你最佳的观影体验！</p>
      </div>
    </div>
    <div class="division"><h3>联系我们</h3>
      <h3 style="color: #888;font-weight: 400">--- CONTACT ---</h3></div>
    <div class="footer">
      <a href="https://github.com/tianzhaotju"><img src="../assets/github.png"><span>https://github.com/tianzhaotju</span></a>
      <a href="https://gitee.com/tianzhao1020"><img src="../assets/github.png"><span>https://gitee.com/tianzhao1020</span></a>
    </div>
  </div>
</template>

<script>
import fetch from '../api/fetch';
// eslint-disable-next-line import/extensions,import/no-unresolved
import store from '../store/store';
// eslint-disable-next-line import/extensions,import/no-unresolved

export default {
  data() {
    return {
      crouselImg: [
        { img: 'https://ydschool-video.nosdn.127.net/1583850881001Snipaste_2020-03-10_22-35-21.png' },
        { img: 'https://ydschool-video.nosdn.127.net/1583851372811Snipaste_2020-03-10_22-43-36.png' },
        { img: 'https://ydschool-video.nosdn.127.net/1583851439196Snipaste_2020-03-10_22-42-28.png' },
        { img: 'https://ydschool-video.nosdn.127.net/1583851475466Snipaste_2020-03-10_22-40-12.png' },

      ],
      activeIndex2: '1',
      movieList: [],
      personList: [],
      recommendList: [{ movieId: 1306004, name: '重返中世纪', cover: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p1878110577.jpg' },
        { movieId: 1307266, name: '一声惊雷', cover: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2178025056.jpg' },
        { movieId: 1308835, name: '诸神混乱之女神陷阱', cover: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1775859403.jpg' },
        { movieId: 1309166, name: '零号嫌疑犯', cover: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529453201.jpg' }],
      isLogin: !!store.state.token,
      isShow: false,
    };
  },

  mounted() {
    window.addEventListener('scroll', this.handler);
    this.getMovie();
    this.getPerson();
    this.getRecommend();
  },
  methods: {
    handler() {
      const info = document.getElementById('aboutusInfo') || null;
      const card = document.getElementsByClassName('temp')[0] || null;
      if (info === null || card === null) {

      } else if (document.documentElement.scrollTop > 1000) {
        card.classList.add('animated');
        card.classList.add('bounceInLeft');
        info.classList.add('animated');
        info.classList.add('bounceInLeft');
      } else {
        info.classList.remove('animated');
        info.classList.remove('bounceInLeft');
        card.classList.remove('animated');
        card.classList.remove('bounceInLeft');
      }
    },

    getPersonDetail(id, name) {
      localStorage.setItem('personId', id);
      localStorage.setItem('personName', name);
      this.$router.push({ name: 'personInfo' });
    },

    getPerson() {
      fetch.getPerson()
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.personList = res.data.data.personList;
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getMovie() {
      fetch.getMovieHigh()
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.movieList = res.data.data.movieList;
            }
          }
        });
    },

    getRecommend() {
      fetch.getRecommend()
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.recommendList = res.data.data;
            }
          }
        });
    },

    getMovieDetail(id) {
      localStorage.setItem('movieId', id);
      this.$router.push({ name: 'movieInfo' });
    },
  },
};
</script>


<style>
  @import "../assets/Animate/animate.min.css";

  * {
    box-sizing: border-box;
  }

  body {
    background: #ededed;
    padding: 0;
    margin: 0;
  }

  .myMenu {
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .indexContain {
    width: 100%;
    height: 100%;
    border: 1px solid #ededed;
    background: #fff;
  }

  .cardContain {
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .cardContainx {
    width: 100%;
    height: 30%;
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
    width: 1200px;
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

  .wrapper-cardx {
    width: 1200px;
    height: 400px;
    margin: 30px auto auto auto;
    padding-top: 30px;
  }

  .wrapper-cardx .card {
    color: #07111B;
    font-size: 16px;
    width: 230px;
    height: 243px;
    float: left;
    margin: 30px;
    border-radius: 6px;
  }

  .wrapper-cardx .card:hover {
    transform: translateY(-5px);
    transition: 3ms;
    box-shadow: 5px 5px 10px #888;
  }

  .wrapper-cardx .image {
    border-radius: 6px 6px 0 0;
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
    border-radius: 6px;
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

  .division {
    width: 100%;
    margin: 30px auto;
    text-align: center;
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

</style>
