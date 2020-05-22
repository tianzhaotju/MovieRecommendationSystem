<template>
  <!--演员资源-->
  <div>
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
    <div>
      <el-button class="editt" @click="prePage()">上一页</el-button>
      <el-button type="primary" class="editt">{{this.count}}</el-button>
      <el-button class="editt" >{{this.count+1}}</el-button>
      <el-button class="editt" >{{this.count+2}}</el-button>
      <el-button class="editt" @click="nextPage()">下一页</el-button>
    </div>
  </div>
</template>

<script>
import fetch from '../api/fetch';

export default {
  data() {
    return {
      personList: [],
      count: 1,
      isShow: false,
    };
  },
  mounted() {
    this.getPerson();
  },
  computed: {
    isLogin() {
      return !!localStorage.getItem('token');
    },
  },
  methods: {
    prePage() {
      if (this.count > 1) {
        this.count = this.count - 1;
      }
      this.getPerson();
    },
    nextPage() {
      this.count = this.count + 1;
      this.getPerson();
    },
    getPerson() {
      fetch.getPerson(this.count)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.personList = res.data.data.personList;
            }
          }
        });
    },
    getPersonDetail(id, name) {
      localStorage.setItem('personId', id);
      localStorage.setItem('personName', name);
      this.$router.push({ name: 'personInfo' });
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
    margin: 10px auto;
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

  .editt {
    margin: 0px auto auto 0px;
  }

</style>
