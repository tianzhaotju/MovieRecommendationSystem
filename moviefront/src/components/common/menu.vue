<template>
  <header>
    <div class="contain">
      <div>
        <span @click="redirect(1)" class="tab">首页</span>
        <span @click="redirect(2)" class="tab" v-if="!isShow">个人中心</span>
        <span @click="redirect(8)" class="tab">
          <i style="margin-right:0.3rem" @click="redirect(8)">
            </i>可视化分析
          </span>
        <span class="tab">
          <el-input placeholder="搜索电影" style="width:18rem" v-model="content" @change="searchMovie(content)">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </span>
      </div>
      <div>
        <span @click="redirect(3)" class="tab">
          <i style="margin-right:0.3rem" @click="redirect(3)">
            </i>更多演员
          </span>
        <span @click="redirect(4)" class="tab">
          <i style="margin-right:0.3rem" @click="redirect(4)">
            </i>更多电影
          </span>
        <span @click="redirect(5)" class="tab">
          <i style="margin-right:0.3rem" @click="redirect(5)">
            </i>电影推荐
          </span>
        <span @click="redirect(6)" class="tab">
          <i style="margin-right:0.3rem" @click="redirect(6)">
            </i>排行榜
          </span>
        <span v-if="isShow">
          <span class="tab" @click="redirect(7)">登录</span>
          <span class="tab"  @click="toregister">注册</span>
        </span>
        <span v-if="!isShow" class="tab" @click="logout()" >退出</span>
      </div>
    </div>
  </header>
</template>

<script>/* eslint-disable standard/object-curly-even-spacing */

import fetch from '../../api/fetch';
import store from '../../store/store';
import * as types from '../../store/types';

export default {
  data() {
    return {
      index: 0,
      count: 0,
      amount: 0,
      content: '',
      companyList: [],
      msg: '',
      isShow: true,
    };
  },
  created() {
  },
  watch: {
    amount() {
      location.reload();
    },
  },
  mounted() {
    if (localStorage.getItem('token') !== null) {
      this.isShow = false;
    }
  },
  methods: {
    redirect(num) {
      if (num === 1) {
        this.$router.push({ name: 'index' });
      } else if (num === 2) {
        this.$router.push({ name: 'userInfo' });
      } else if (num === 3) {
        this.$router.push({ name: 'personList' });
      } else if (num === 4) {
        this.$router.push({ name: 'movieList' });
      }else if (num === 5) {
        this.$router.push({ name: 'userMovieRecommend' });
      } else if (num === 6) {
        this.$router.push({ name: 'topMovie' });
      } else if (num === 7) {
        this.$router.push({ name: 'login' });
      } else if (num === 8){
        this.$router.push({ name: 'visualization'})
      }
    },
    toregister() {
      this.$router.push({ name: 'register' });
    },
    searchMovie(value) {
      if (value !== null) {
        localStorage.setItem('content', value);
      }
      // this.$router.push({ name: 'searchMovie' });
      // this.$router.go(0)
      this.$router.push({ name: 'searchMovie' }, () => {}, (e) => {
        console.log('输出报错',e)
        this.$router.go(0)
      })
    },
    logout() {
      fetch
        .logout()
        .then((res) => {
          if (res.status === 200) {
            this.$message({
              message: res.data.msg,
              type: 'success',
            });
            store.commit(types.LOGOUT);
            this.$router.push({ name: 'login' });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>


<style>
  html * {
    padding: 0;
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
  header {
    width: 100%;
    height: 60px;
    background: rgba(0,0,0,0.8);
  }
  .contain {
    display: flex;
    justify-content: space-between;
    width: 1100px;
    margin: auto;
    line-height: 60px;
    font-weight: 500;
  }
  .contain .tab{
    color: white;
    font-size: 16px;
    margin: 10px;
    padding: 6px;
    border-radius: 4px;
  }
  .icon {
    position: relative;
    background: red;
    font-size: 10px;
    border-radius: 50%;
    left: 0;
    top: -8px;
    padding: 0 5px;
    color: #fff;
  }

  .requireinput {
    width: 35%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: 0;
    background: #fff;
    padding: 0 15px;
    margin: auto 11.2px 14px auto;
  }

  .requireselect {
    width: 35%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    outline: 0;
    background: #fff;
    padding: 0 15px;
    margin: auto 11.2px 14px auto;
  }

  .require {
    width: 80%;
  }

  .addbtn {
    position: relative;
    top: 40px;
    left: 280px;
  }

  .delete {
    color: #dcdfe6;
    position: relative;
    left: -10px;
  }

  .delete:hover {
    color: red;
  }

</style>
