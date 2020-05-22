<template>
  <div class="container">
    <div class="registerForm">
      <el-form :model="registerInfo" status-icon :rules="registerrules" ref="registerInfo" label-width="100px"
               class="registerRuleForm">
        <el-form-item prop="username">
          <el-input type="text" v-model="registerInfo.username" auto-complete="off" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="registerInfo.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="registerInfo.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model.number="registerInfo.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model.number="registerInfo.code" style="width: 270px;padding-right: 10px;"
                    placeholder="验证码"></el-input>
          <el-button @click="sendCode">{{this.msg}}</el-button>
        </el-form-item>
<!--        <el-form-item>-->
<!--           <span style="float: left">请选择喜欢的电影类型：</span>-->
<!--        </el-form-item>-->
        <el-form-item prop="registerTag">
          <span style="float: left">请选择喜欢的电影类型：</span>
          <br />
          <div class="mutli">
<!--          <template v-for="prop in tags">-->
            <dd v-for="op in tags" class="mutli">
              <input type="checkbox" :value="op" v-model="registerInfo.tags">{{op}}
            </dd>
          </div>
<!--          </template>-->
        </el-form-item>
          <el-form-item>
            <el-button type="primary" class="registerBtn" @click="registerSubmit('registerInfo')">注册</el-button>
          </el-form-item>
      </el-form>
      <div class="footer-tip3" @click="toLogin">
        已有账号?直接登录
      </div>
    </div>
  </div>
</template>

<script>/* eslint-disable indent,quotes,space-before-function-paren,brace-style */

import fetch from '../api/fetch';

export default {
  data() {
    // eslint-disable-next-line consistent-return
    const checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入验证码'));
      }
      callback();
    };
    // eslint-disable-next-line consistent-return
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号'));
      } else if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
        return callback(new Error('请输入正确的手机号'));
      }
      callback();
    };
    const validUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!/^\w+$/gi.test(value)) {
        callback(new Error('用户名必须由英文或者数字组成'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerInfo.checkPass !== '') {
          this.$refs.registerInfo.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerInfo.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      msg: '发送验证码',
      count: '',
      timer: null,
      show: true,
      confirmCode: '',
      options: [],
      tags: [],
      dialogShow: false,
      tipsShow: false,
      formLabelWidth: '120px',
      registerInfo: {
        password: '',
        checkPass: '',
        phone: '',
        username: '',
        code: '',
        tags: [],
      },
      registerrules: {
        code: [{ validator: checkCode, trigger: 'blur' }],
        username: [{ validator: validUsername, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        phone: [{ validator: checkPhone, trigger: 'blur' }],
      },
    };
  },

  mounted() {
    this.getUserTags();
    this.addAnimation();
  },

  methods: {
    addAnimation() {
      const form = document.getElementsByClassName('registerForm')[0];
      form.classList.add('animated');
      form.classList.add('bounceInDown');
    },

    sendCode() {
      const TIME_COUNT = 60;
      if (!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.registerInfo.phone)) return;
      fetch
        .sendCode(this.registerInfo.phone)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.$message({
                message: '发送成功',
                type: 'success',
              });
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            // eslint-disable-next-line no-plusplus
            this.count--;
            this.msg = `${this.count}s后发送`;
            if (this.count === 0) {
              this.msg = '发送验证码';
            }
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },

    registerSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && !this.tipsShow) {
          const result = {
            password: this.registerInfo.password,
            phone: this.registerInfo.phone,
            username: this.registerInfo.username,
            code: this.registerInfo.code,
            userTags: JSON.stringify(this.registerInfo.tags),
          };
          // 用户注册
          fetch
            .userRegister(result)
            .then((res) => {
              if (res.status === 200) {
                if (res.data.code === 0) {
                  this.$message({
                    message: '注册成功',
                    type: 'success',
                  });
                  this.$router.push({ name: 'login' });
                } else {
                  this.$message({
                    message: res.data.description,
                    type: 'warning',
                  });
                }
              }
            })
            // eslint-disable-next-line no-unused-vars
            .catch((e) => {
              this.$message({
                message: '注册失败',
                type: 'error',
              });
            });
        }
      });
    },
    toLogin() {
      this.$router.push({ name: 'login' });
    },

    getUserTags() {
      fetch
        .movieTags()
        .then((res) => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              this.tags = res.data.data;
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning',
              });
            }
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch((e) => {
          this.$message({
            message: '获取标签失败',
            type: 'warning',
          });
        });
    },
  },
};
</script>


<style>
  @import "../assets/Animate/animate.min.css";

  html * {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }


  .container {
    width: 100%;
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .container::before {
    content: '';
    position: absolute;
    filter: blur(1px);
    background-size: 100% 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: matrix(1, 0, 0, 1, 0, 0);
    transition: all 500ms linear 0s;
  }

  .container:hover::before {
    transform: matrix(1.05, 0, 0, 1.05, 3.07, 5.7)
  }

  .choice {
    text-align: left;
    padding-left: 100px;
  }

  .choice p {
    display: inline-block;
    width: 173px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #5a5a5a;
  }

  .choice p:first-child {
    border-right: 1px solid #ededed;
    font-weight: 700;
  }

  .registerForm {
    background: #fff;
    border: 1px solid #ededed;
    width: 555px;
    min-height: 630px;
    margin: 120px auto 150px auto;
    box-shadow: 0px 5px 8px #888;
    border-radius: 8px;
    padding-top: 36px;
    position: relative;
  }

  .el-form-item__content {
    margin-left: 0px !important;
  }


  .registerRuleForm {
    width: 500px;
    position: relative;
    top: 14px;
    left: -14px;
    padding: 14px 14px 14px 100px;
  }

  .footer-tip3 {
    position: absolute;
    bottom: 16px;
    right: 16px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.5);
  }

  .registerBtn {
    width: 100%;
  }

  .tips {
    margin-top: -20px;
    text-align: left;
    cursor: pointer;
    color: red;
    font-size: 14px;
  }

  .bg_bottom {
    position: fixed;
    bottom: 0;
    right: 0;
  }

  .bg_bottom2 {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .mutli dd,.singleli dd {
    float: left;
    margin-right: 6px;
    vertical-align: middle;
    padding: 3px 15px 1px 20px;
    cursor: pointer;
    color: #006fbc;
    display: inline-block;
  }

  .mutli input[type="checkbox"], .singleli input[type="checkbox"] {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: 3px 15px;
    cursor: pointer;
    color: #006fbc;
    margin-left: -18px;
  }
</style>
