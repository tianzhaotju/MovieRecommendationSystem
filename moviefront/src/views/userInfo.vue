<template>
  <div>
    <div class="wrapper">
      <el-card class="box-card">
        <div>
          <el-upload
            class="avatar-uploader"
            action="http://movie.pqdong.com:10015/user/avatar"
            name="avatar"
            :headers="head"
            :data="{'userMd': this.list.userMd}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl"  class="avatar">
            <img v-else class="img" :src="setDefault">
          </el-upload>
          <span class="username">{{list ? list.username : ''}}</span>
        </div>
      </el-card>
      <el-tabs type="border-card" tabPosition="left"
               style="width:1000px;height: 100vh;margin: 14px auto auto auto;position: sticky">
        <el-tab-pane>
          <span slot="label">个人信息<i class="el-icon-arrow-right"></i></span>
          <user :list="list" :imageUrl="imageUrl" class="user"></user>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">我的评论<i class="el-icon-arrow-right"></i></span>
          <comment></comment>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>/* eslint-disable indent */

import fetch from '../api/fetch';
import Info from '../components/userInfo';
import CommentInfo from '../components/commentInfo';

export default {
  data() {
    return {
      activeIndex2: '1',
      btnText: '取消',
      list: {
        username: '',
        sex: '',
        phone: '',
        userTags: [],
        userMd: '',
        userAvatar: '',
        motto: '',
      },
      imageUrl: '',
      head: {
        token: localStorage.getItem('token'),
      },
      refresh: 0,
    };
  },
  computed: {
    setDefault() {
      if (this.list.userAvatar != null) {
        return this.list.userAvatar;
      }
      return 'http://oimagec6.ydstatic.com/image?id=-4541055657611236390&product=bisheng';
    },
  },
  mounted() {
    this.getUserInfo();
    this.refresh = this.$route.params.refresh !== undefined ? this.$route.params.refresh : 0;
  },
  watch: {
    refresh() {
      location.reload();
    },
  },
  components: {
    user: Info,
    comment: CommentInfo,
  },
  methods: {
    getUserInfo() {
      fetch
        .getUserInfo(localStorage.getItem('token'))
        .then((res) => {
          if (res.data.code === 0) {
            this.list = res.data.data !== null ? res.data.data : this.list;
            this.list.userTags = JSON.parse(this.list.userTags);
          } else {
            this.$message({
              type: 'warning',
              message: res.data.description,
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err,
          });
        });
    },
    handleAvatarSuccess(res) {
      this.imageUrl = res.data;
    },
    getComment() {
      this.$router.push({ name: 'commentInfo' });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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

  .box-card {
    width: 1000px;
    margin: 14px auto auto auto;
  }

  .img {
    border-radius: 50%;
    width: 70px;
    height: 70px;
  }

  .el-card .username {
    float: left;
    margin-left: 14px;
    font-size: 21px;
  }

  .avatar-uploader {
    float: left;
  }

  .avatar-uploader .el-upload {
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-bottom: 14px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>
