webpackJsonp([0],{"/hG1":function(t,e){},"J+Zi":function(t,e){},ti7S:function(t,e){},yMOr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("HNM5"),i=s("mvHQ"),r=s.n(i),n={props:["list","imageUrl"],data:function(){return{refresh:0,tags:[],userTags:[],isEdit:!1,rules2:{username:[{validator:function(t,e,s){if(!e)return s(new Error("昵称不能为空"));s()},trigger:"blur"}],sex:[{validator:function(t,e,s){if(!e)return s(new Error("性别不能为空"));s()},trigger:"blur"}]}}},mounted:function(){this.getUserTags()},watch:{refresh:function(){location.reload()}},methods:{getUserTags:function(){var t=this;a.a.movieTags().then(function(e){200===e.status&&(0===e.data.code?t.tags=e.data.data:t.$message({message:e.data.msg,type:"warning"}))}).catch(function(e){t.$message({message:"获取标签失败",type:"warning"})})},changeEdit:function(){this.isEdit=!this.isEdit},backToView:function(){this.isEdit=!this.isEdit,this.list.userTags=JSON.parse(this.list.userTags)},toIndex:function(){this.$router.push({name:"index"})},submitInfo:function(t){var e=this;this.$refs[t].validate(function(t){t?(console.log(e.userTags),e.list.userTags=r()(e.userTags),console.log(e.list),a.a.putUserInfo(e.list).then(function(t){console.log("list",e.list),0===t.data.code?e.$message({message:"保存成功",type:"success"}):e.$message({message:t.data.description,type:"error"})}).catch(function(t){e.$message({message:t,type:"error"})})):console.log("error submit!!")})}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.isEdit?t._e():s("table",{staticClass:"container"},[s("tr",[s("td",[t._v("昵称：")]),t._v(" "),s("td",[t._v(t._s(t.list.username))])]),t._v(" "),s("tr",[s("td",[t._v("性别：")]),t._v(" "),s("td",[t._v(t._s(t.list.sex))])]),t._v(" "),s("tr",[s("td",[t._v("手机号：")]),t._v(" "),s("td",[t._v(t._s(t.list.phone))])]),t._v(" "),s("tr",[s("td",[t._v("电影标签：")]),t._v(" "),s("td",[s("div",t._l(t.list.userTags,function(e){return s("span",[s("el-button",{staticClass:"editt"},[t._v(t._s(e))]),t._v(" "),s("span",[t._v(" ")])],1)}),0)])]),t._v(" "),s("tr",[s("td",[t._v("个人宣言：")]),t._v(" "),s("td",[t._v(t._s(t.list.motto))])]),t._v(" "),s("tr",[s("td",[t._v("ID：")]),t._v(" "),s("td",[t._v(t._s(t.list.userMd))])]),t._v(" "),t._m(0)]),t._v(" "),t.isEdit?s("el-form",{ref:"list",staticClass:"formWrap",attrs:{model:t.list,"status-icon":"",rules:t.rules2,"label-width":"100px"}},[s("el-form-item",{staticStyle:{"text-align":"right"},attrs:{label:"昵称",prop:"username"}},[s("el-input",{attrs:{"auto-complete":"off"},model:{value:t.list.username,callback:function(e){t.$set(t.list,"username",e)},expression:"list.username"}})],1),t._v(" "),s("el-form-item",{staticStyle:{"text-align":"right"},attrs:{label:"标签",prop:"userTags"}},[s("div",{staticClass:"mutli"},t._l(t.tags,function(e){return s("dd",{staticClass:"mutli"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.userTags,expression:"userTags"}],attrs:{type:"checkbox"},domProps:{value:e,checked:Array.isArray(t.userTags)?t._i(t.userTags,e)>-1:t.userTags},on:{change:function(s){var a=t.userTags,i=s.target,r=!!i.checked;if(Array.isArray(a)){var n=e,o=t._i(a,n);i.checked?o<0&&(t.userTags=a.concat([n])):o>-1&&(t.userTags=a.slice(0,o).concat(a.slice(o+1)))}else t.userTags=r}}}),t._v(t._s(e)+"\n        ")])}),0)]),t._v(" "),s("span",[s("el-form-item",{staticStyle:{"text-align":"right"},attrs:{label:"个人宣言",prop:"motto"}},[s("el-input",{attrs:{"auto-complete":"off"},model:{value:t.list.motto,callback:function(e){t.$set(t.list,"motto",e)},expression:"list.motto"}})],1)],1),t._v(" "),s("span",[s("el-form-item",{staticStyle:{"text-align":"right"},attrs:{label:"性别",prop:"sex"}},[s("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择性别"},model:{value:t.list.sex,callback:function(e){t.$set(t.list,"sex",e)},expression:"list.sex"}},[s("el-option",{attrs:{label:"男",value:"男"}}),t._v(" "),s("el-option",{attrs:{label:"女",value:"女"}})],1)],1)],1),t._v(" "),s("el-form-item",[s("el-button",{staticClass:"editor",on:{click:t.backToView}},[t._v("返回")]),t._v(" "),s("el-button",{on:{click:function(e){return t.submitInfo("list")}}},[t._v("提交")])],1)],1):t._e(),t._v(" "),s("div",[t.isEdit?t._e():s("el-button",{staticClass:"edit",on:{click:t.changeEdit}},[t._v("编辑")]),t._v(" "),t.isEdit?t._e():s("el-button",{staticClass:"edit",on:{click:t.toIndex}},[t._v("返回")])],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td")])}]};var l={props:[],data:function(){return{comment:{},isShow:!1,count:1}},mounted:function(){this.getCommentDetail()},computed:{},methods:{prePage:function(){this.count>1&&(this.count=this.count-1),this.getCommentDetail()},nextPage:function(){this.count=this.count+1,this.getCommentDetail()},getCommentDetail:function(){var t=this,e=JSON.parse(localStorage.getItem("user"));a.a.getCommentList({page:this.count,size:12,userMd:e.userMd,content:""}).then(function(e){200===e.status&&(t.comment=e.data.data.commentList,t.isShow=!0)}).catch(function(t){console.log(t)})},viewMovie:function(t){window.open(t)}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.isShow?t._e():s("el-card",{staticClass:"moviecard"},[s("img",{attrs:{src:"http://www.pqdong.com/wp-content/uploads/2020/03/tip-img.png"}}),t._v(" "),s("p",[t._v("啊哦，你还没有留下过评论！")])]),t._v(" "),t.isShow?s("div",[s("el-card",{staticClass:"moviecard"},[s("div",{staticClass:"movieintroduce"},[t._v("电影评论")]),t._v(" "),s("div",{staticClass:"newsContain"},[s("div",{staticClass:"temp"},t._l(t.comment,function(e,a){return s("div",{key:a,staticClass:"newsItem"},[s("div",{staticClass:"picContain",attrs:{ontouchstart:"this.classList.toggle('hover');"}},[s("meta",{attrs:{name:"referrer",content:"no-referrer"}}),t._v(" "),s("img",{attrs:{src:e.userAvatar,height:"75",width:"75"}})]),t._v(" "),s("div",[s("p",{staticStyle:{"white-space":"pre-wrap",color:"#66b1ff"}},[t._v("用户："+t._s(e.userName)+"    赞同："+t._s(e.votes)+"     时间："+t._s(e.commentTime))]),t._v(" "),s("p",{staticStyle:{"margin-top":"25px"}},[t._v(t._s(e.content))])])])}),0)]),t._v(" "),s("div",[s("el-button",{staticClass:"editt",on:{click:function(e){return t.prePage()}}},[t._v("上一页")]),t._v(" "),s("el-button",{staticClass:"editt",attrs:{type:"primary"}},[t._v(t._s(this.count))]),t._v(" "),s("el-button",{staticClass:"editt"},[t._v(t._s(this.count+1))]),t._v(" "),s("el-button",{staticClass:"editt"},[t._v(t._s(this.count+2))]),t._v(" "),s("el-button",{staticClass:"editt",on:{click:function(e){return t.nextPage()}}},[t._v("下一页")])],1)])],1):t._e()],1)},staticRenderFns:[]};var u={data:function(){return{activeIndex2:"1",btnText:"取消",list:{username:"",sex:"",phone:"",userTags:[],userMd:"",userAvatar:"",motto:""},imageUrl:"",head:{token:localStorage.getItem("token")},refresh:0}},computed:{setDefault:function(){return null!=this.list.userAvatar?this.list.userAvatar:"http://oimagec6.ydstatic.com/image?id=-4541055657611236390&product=bisheng"}},mounted:function(){this.getUserInfo(),this.refresh=void 0!==this.$route.params.refresh?this.$route.params.refresh:0},watch:{refresh:function(){location.reload()}},components:{user:s("VU/8")(n,o,!1,function(t){s("ti7S")},null,null).exports,comment:s("VU/8")(l,c,!1,function(t){s("J+Zi")},null,null).exports},methods:{getUserInfo:function(){var t=this;a.a.getUserInfo(localStorage.getItem("token")).then(function(e){0===e.data.code?(t.list=null!==e.data.data?e.data.data:t.list,t.list.userTags=JSON.parse(t.list.userTags)):t.$message({type:"warning",message:e.data.description})}).catch(function(e){t.$message({type:"error",message:e})})},handleAvatarSuccess:function(t){this.imageUrl=t.data},getComment:function(){this.$router.push({name:"commentInfo"})},beforeAvatarUpload:function(t){var e="image/jpeg"===t.type,s=t.size/1024/1024<2;return e||this.$message.error("上传头像图片只能是 JPG 格式!"),s||this.$message.error("上传头像图片大小不能超过 2MB!"),e&&s}}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"wrapper"},[s("el-card",{staticClass:"box-card"},[s("div",[s("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://movie.pqdong.com:10015/user/avatar",name:"avatar",headers:t.head,data:{userMd:this.list.userMd},"show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.imageUrl?s("img",{staticClass:"avatar"}):s("img",{staticClass:"img",attrs:{src:t.setDefault}})]),t._v(" "),s("span",{staticClass:"username"},[t._v(t._s(t.list?t.list.username:""))])],1)]),t._v(" "),s("el-tabs",{staticStyle:{width:"1000px",height:"100vh",margin:"14px auto auto auto",position:"sticky"},attrs:{type:"border-card",tabPosition:"left"}},[s("el-tab-pane",[s("span",{attrs:{slot:"label"},slot:"label"},[t._v("个人信息"),s("i",{staticClass:"el-icon-arrow-right"})]),t._v(" "),s("user",{staticClass:"user",attrs:{list:t.list,imageUrl:t.imageUrl}})],1),t._v(" "),s("el-tab-pane",[s("span",{attrs:{slot:"label"},slot:"label"},[t._v("我的评论"),s("i",{staticClass:"el-icon-arrow-right"})]),t._v(" "),s("comment")],1)],1)],1)])},staticRenderFns:[]};var m=s("VU/8")(u,d,!1,function(t){s("/hG1")},null,null);e.default=m.exports}});
//# sourceMappingURL=0.aa8acedcbba2b127fa56.js.map