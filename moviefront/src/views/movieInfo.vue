<template>
  <div>
    <el-card v-if="isShow" class="moviecard">
      <img src="http://www.pqdong.com/wp-content/uploads/2020/03/tip-img.png">
      <p>啊哦，电影已经下线了</p>
    </el-card>
    <div v-if="!isShow">
      <el-card class="moviecard" style="height: 200px;">
        <img :src="movie.cover" class="avatar">
        <div class="introduce">
          <p class="title">{{movie.name}}</p>
          <p>标签：{{movie.tags}}</p>
          <p>主演：{{movie.actors}}</p>
<!--          <p>评分：{{movie.score}}<span>|</span>投票数：{{movie.votes}}</p>-->
          <p>评分：{{movie.score}}</p>
        </div>
<!--        <el-button type="primary" v-if="movie.officialSite" class="moviebtn" @click="viewMovie(movie.officialSite)" plain>观看电影</el-button>-->
<!--        <el-button v-else class="moviebtn">无法观看，暂无资源</el-button>-->
      </el-card>
      <el-card class="moviecard">
        <div class="movieintroduce">电影简介</div>
        <div class="movieintroducet">
          <p>导演：{{movie.directors}}</p>
          <p>上映时间：{{movie.releaseDate}}<span>|</span>地区：{{movie.regions}}<span>|</span>语言：{{movie.languages}}</p>
          <p>片长：{{movie.mins}} 分钟</p>
        </div>
      <div>
        <span v-show="!hasSet" v-for="n in 10">
              <el-button class="scorec" @click="setScore(n,movie.votes)">{{n}}</el-button>
              <span>&ensp;</span>
            </span>
        <span v-show="hasSet">你已经为此电影打过分！！！</span>
        <el-button type="primary" v-if="true" class="combtn" plain>点击右侧为电影打分</el-button>
      </div>
      </el-card>
      <el-card class="moviecard">
        <div class="movieintroduce">电影内容</div>
        <div class="moviecontent">
          <p>{{movie.storyline}}</p>
        </div>
      </el-card>


      <el-card class="moviecard">
      <div class="movieintroduce">喜欢这部电影的人也喜欢</div>
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


      <el-card class="moviecard">
        <div class="movieintroduce">电影评论</div>
        <div class="newsContain">
          <div class="temp">
            <!--        @click="personDetail(item.id)-->
            <el-input placeholder="登录后才可以评论哟~"  v-model="commentInput" maxlength="50" v-show="!isLogin" disabled type="textarea" autosize style="margin-top: 20px">
            </el-input>
            <el-input placeholder="请输入内容"  v-model="commentInput" maxlength="50" v-show="isLogin" type="textarea" autosize style="margin-top: 20px">
            </el-input>
            <el-button @click="postComment" class="combtn2" plain size="small">评论</el-button>
            <el-button @click="clearComment" class="combtn2" plain size="small">清除</el-button>
            <div class="newsItem" v-for="(item, key) in comment" :key="key">
              <div class="picContain" ontouchstart="this.classList.toggle('hover');">
                <meta name="referrer" content="no-referrer"/>
                <img :src=item.userAvatar height="75" width="75">
              </div>
              <div>
                <p style="white-space: pre-wrap; color: #66b1ff">用户：{{item.userName}}    赞同：{{item.votes}}     时间：{{item.commentTime}}</p>
                <p style="margin-top:25px">{{item.content}}</p>
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
      start:false,
      movie: {},
      comment: {},
      isShow: false,
      isLogin: false,
      hasSet: false,
      commentInput: '',
      count: 1,
    };
  },
  mounted() {
    this.getMovieDetail();
    this.getCommentDetail();
    this.getRecommendMovie();
  },
  computed: {
  },
  methods: {
    setScore(score,votes) {
      this.hasSet = true;
      const user = JSON.parse(localStorage.getItem('user'));
      this.movie.score = (score + this.movie.score*votes) / (votes+1);
      fetch
        .putMovie({
          movieId: this.movie.movieId,
          userId: user.id,
        })
        .then((res) => {
          if (res.code === 0) {
            // this.getMovieDetail();
          } else if (res.code === 500) {
            this.$message({
              message: '请先登录',
              type: 'warning',
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
      this.movie.votes = votes+1;
    },
    prePage() {
      if (this.count > 1) {
        this.count = this.count - 1;
      }
      this.getCommentDetail();
    },
    nextPage() {
      this.count = this.count + 1;
      this.getCommentDetail();
    },
    getMovieDetail() {
      const movieId = localStorage.getItem('movieId');
      const cover = localStorage.getItem('cover');
      fetch.getMovieInfo(movieId)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.data === null) {
              this.isShow = true;
            }
            res.data.data['cover'] = cover;
            this.movie = res.data.data;
            console.log(this.movie);
            this.start = true;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getMovieDetail2(id,cover) {
      localStorage.setItem('movieId', id);
      localStorage.setItem('cover', cover);
      // this.$router.push({ name: 'movieInfo' });
      // 重复路由
      this.$router.go(0);
    },
    preMoviePage() {
      if (this.movie_count > 1) {
        this.movie_count = this.movie_count - 1;
      }
      this.getRecommendMovie();
    },
    nextMoviePage() {
      this.movie_count = this.movie_count + 1;
      this.getRecommendMovie();
    },
    getRecommendMovie() {
      const mid = localStorage.getItem('movieId');
        fetch.getRecommendMovie({
          count: this.movie_count,
          id: mid,
      }).then((res) => {
        this.movieList = JSON.parse(res.data.m_list);
      });
    },
    getCommentDetail() {
      if (localStorage.getItem('token') !== null) {
        this.isLogin = true;
      }
      const movieId = localStorage.getItem('movieId');
      fetch
        .getCommentList({
          page: this.count,
          size: 12,
          movieId,
          userId: '',
          content: '',
        })
        .then((res) => {
          if (res.status === 200) {
            this.comment = res.data.data.commentList;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    clearComment() {
      this.commentInput = '';
    },
    postComment() {
      const submitComment = {};
      if (this.commentInput === '') {
        this.$message({
          message: '请输入评论...',
          type: 'warning',
        });
        return;
      }
      submitComment.movieId = localStorage.getItem('movieId');
      const user = JSON.parse(localStorage.getItem('user'));
      submitComment.commentId = Date.parse(new Date());
      submitComment.userName = user.username;
      submitComment.userMd = user.userMd;
      submitComment.userAvatar = user.userAvatar;
      submitComment.movieName = this.movie.name;
      submitComment.votes = 0;
      submitComment.content = this.commentInput;
      submitComment.commentTime = Date.parse(new Date());
      fetch
        .submitComment(submitComment)
        .then((res) => {
          if (res.data.code === 0) {
            this.commentInput = '';
            this.comment = res.data.data.commentList;
            this.$message({
              message: '提交成功！',
              type: 'success',
            });
            this.getCommentDetail();
          } else if (res.data.code === 1) {
            this.$message({
              message: '您的评论提交次数过快，请稍后重试！',
              type: 'warning',
            });
          } else if (res.data.code === 1001) {
            this.$message({
              message: '请先登录',
              type: 'warning',
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    viewMovie(url) {
      window.open(url);
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
