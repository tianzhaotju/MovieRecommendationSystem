webpackJsonp([3],{"29Ub":function(t,e){},"6RBu":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("HNM5"),i={data:function(){return{movie:{},comment:{},isShow:!1,isLogin:!1,hasSet:!1,commentInput:"",count:1}},mounted:function(){this.getMovieDetail(),this.getCommentDetail()},computed:{},methods:{setScore:function(t){var e=this;this.hasSet=!0;var s=JSON.parse(localStorage.getItem("user"));this.movie.score=(t+this.movie.score)/2,a.a.putMovie({movieId:this.movie.movieId,userId:s.id,rating:this.movie.score}).then(function(t){0===t.code||500===t.code&&e.$message({message:"请先登录",type:"warning"})}).catch(function(t){console.log(t)})},prePage:function(){this.count>1&&(this.count=this.count-1),this.getCommentDetail()},nextPage:function(){this.count=this.count+1,this.getCommentDetail()},getMovieDetail:function(){var t=this,e=localStorage.getItem("movieId");a.a.getMovieInfo(e).then(function(e){200===e.status&&(null===e.data.data&&(t.isShow=!0),t.movie=e.data.data)}).catch(function(t){console.log(t)})},getCommentDetail:function(){var t=this;null!==localStorage.getItem("token")&&(this.isLogin=!0);var e=localStorage.getItem("movieId");a.a.getCommentList({page:this.count,size:12,movieId:e,userId:"",content:""}).then(function(e){200===e.status&&(t.comment=e.data.data.commentList)}).catch(function(t){console.log(t)})},clearComment:function(){this.commentInput=""},postComment:function(){var t=this,e={};if(""!==this.commentInput){e.movieId=localStorage.getItem("movieId");var s=JSON.parse(localStorage.getItem("user"));e.commentId=Date.parse(new Date),e.userName=s.username,e.userMd=s.userMd,e.userAvatar=s.userAvatar,e.movieName=this.movie.name,e.votes=0,e.content=this.commentInput,e.commentTime=Date.parse(new Date),a.a.submitComment(e).then(function(e){0===e.data.code?(t.commentInput="",t.comment=e.data.data.commentList,t.$message({message:"提交成功！",type:"success"}),t.getCommentDetail()):1===e.data.code?t.$message({message:"您的评论提交次数过快，请稍后重试！",type:"warning"}):1001===e.data.code&&t.$message({message:"请先登录",type:"warning"})}).catch(function(t){console.log(t)})}else this.$message({message:"请输入评论...",type:"warning"})},viewMovie:function(t){window.open(t)}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t.isShow?s("el-card",{staticClass:"moviecard"},[s("img",{attrs:{src:"http://www.pqdong.com/wp-content/uploads/2020/03/tip-img.png"}}),t._v(" "),s("p",[t._v("啊哦，电影已经下线了")])]):t._e(),t._v(" "),t.isShow?t._e():s("div",[s("el-card",{staticClass:"moviecard",staticStyle:{height:"200px"}},[s("img",{staticClass:"avatar",attrs:{src:t.movie.cover}}),t._v(" "),s("div",{staticClass:"introduce"},[s("p",{staticClass:"title"},[t._v(t._s(t.movie.name))]),t._v(" "),s("p",[t._v("标签："+t._s(t.movie.tags))]),t._v(" "),s("p",[t._v("主演："+t._s(t.movie.actors))]),t._v(" "),s("p",[t._v("评分："+t._s(t.movie.score)),s("span",[t._v("|")]),t._v("投票数："+t._s(t.movie.votes))])]),t._v(" "),t.movie.officialSite?s("el-button",{staticClass:"moviebtn",attrs:{type:"primary",plain:""},on:{click:function(e){return t.viewMovie(t.movie.officialSite)}}},[t._v("观看电影")]):s("el-button",{staticClass:"moviebtn"},[t._v("无法观看，暂无资源")])],1),t._v(" "),s("el-card",{staticClass:"moviecard"},[s("div",{staticClass:"movieintroduce"},[t._v("电影简介")]),t._v(" "),s("div",{staticClass:"movieintroducet"},[s("p",[t._v("导演："+t._s(t.movie.directors))]),t._v(" "),s("p",[t._v("上映时间："+t._s(t.movie.releaseDate)),s("span",[t._v("|")]),t._v("地区："+t._s(t.movie.regions)),s("span",[t._v("|")]),t._v("语言："+t._s(t.movie.languages))]),t._v(" "),s("p",[t._v("片长："+t._s(t.movie.mins)+" 分钟")])]),t._v(" "),s("div",[t._l(10,function(e){return s("span",{directives:[{name:"show",rawName:"v-show",value:!t.hasSet,expression:"!hasSet"}]},[s("el-button",{staticClass:"scorec",on:{click:function(s){return t.setScore(e)}}},[t._v(t._s(e))]),t._v(" "),s("span",[t._v(" ")])],1)}),t._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:t.hasSet,expression:"hasSet"}]},[t._v("你已经为此电影打过分！！！")]),t._v(" "),s("el-button",{staticClass:"combtn",attrs:{type:"primary",plain:""}},[t._v("点击右侧为电影打分")])],2)]),t._v(" "),s("el-card",{staticClass:"moviecard"},[s("div",{staticClass:"movieintroduce"},[t._v("电影内容")]),t._v(" "),s("div",{staticClass:"moviecontent"},[s("p",[t._v(t._s(t.movie.storyline))])])]),t._v(" "),s("el-card",{staticClass:"moviecard"},[s("div",{staticClass:"movieintroduce"},[t._v("电影评论")]),t._v(" "),s("div",{staticClass:"newsContain"},[s("div",{staticClass:"temp"},[s("el-input",{directives:[{name:"show",rawName:"v-show",value:!t.isLogin,expression:"!isLogin"}],staticStyle:{"margin-top":"20px"},attrs:{placeholder:"登录后才可以评论哟~",maxlength:"50",disabled:"",type:"textarea",autosize:""},model:{value:t.commentInput,callback:function(e){t.commentInput=e},expression:"commentInput"}}),t._v(" "),s("el-input",{directives:[{name:"show",rawName:"v-show",value:t.isLogin,expression:"isLogin"}],staticStyle:{"margin-top":"20px"},attrs:{placeholder:"请输入内容",maxlength:"50",type:"textarea",autosize:""},model:{value:t.commentInput,callback:function(e){t.commentInput=e},expression:"commentInput"}}),t._v(" "),s("el-button",{staticClass:"combtn2",attrs:{plain:"",size:"small"},on:{click:t.postComment}},[t._v("评论")]),t._v(" "),s("el-button",{staticClass:"combtn2",attrs:{plain:"",size:"small"},on:{click:t.clearComment}},[t._v("清除")]),t._v(" "),t._l(t.comment,function(e,a){return s("div",{key:a,staticClass:"newsItem"},[s("div",{staticClass:"picContain",attrs:{ontouchstart:"this.classList.toggle('hover');"}},[s("meta",{attrs:{name:"referrer",content:"no-referrer"}}),t._v(" "),s("img",{attrs:{src:e.userAvatar,height:"75",width:"75"}})]),t._v(" "),s("div",[s("p",{staticStyle:{"white-space":"pre-wrap",color:"#66b1ff"}},[t._v("用户："+t._s(e.userName)+"    赞同："+t._s(e.votes)+"     时间："+t._s(e.commentTime))]),t._v(" "),s("p",{staticStyle:{"margin-top":"25px"}},[t._v(t._s(e.content))])])])})],2)]),t._v(" "),s("div",[s("el-button",{staticClass:"editt",on:{click:function(e){return t.prePage()}}},[t._v("上一页")]),t._v(" "),s("el-button",{staticClass:"editt",attrs:{type:"primary"}},[t._v(t._s(this.count))]),t._v(" "),s("el-button",{staticClass:"editt"},[t._v(t._s(this.count+1))]),t._v(" "),s("el-button",{staticClass:"editt"},[t._v(t._s(this.count+2))]),t._v(" "),s("el-button",{staticClass:"editt",on:{click:function(e){return t.nextPage()}}},[t._v("下一页")])],1)])],1)],1)},staticRenderFns:[]};var n=s("VU/8")(i,o,!1,function(t){s("29Ub")},null,null);e.default=n.exports}});
//# sourceMappingURL=3.04f91c44e34c7d0d66b7.js.map