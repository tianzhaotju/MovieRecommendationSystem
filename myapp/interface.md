# Interface

所有的接口的返回值为Json格式，包含'code'属性，code为1代表操作成功，0代表失败

#### 一、用户接口
1.用户注册
userRegister

2.用户登陆
userLogin

3.获取用户信息
getUserInfo

#### 二、电影接口
1.通过id电影检索
getMovieById

2.通过name电影检索
getMovieByName

3.电影分类
getMovieByType

#### 三、评论接口
1.通过id获取评 
getCommentById

2.通过m_id获取评论
getCommentByMid

3.通过u_id获取评论
getCommentByUid

4.通过u_id和m_id获取评论
getCommentByUidAndMid

5.增加评论
addComment

#### 四、评分接口
1.通过id获取评分
getRatingById

2.通过m_id获取评分
getRatingByMid

3.通过u_id获取评分
getRatingByUid

4.通过u_id和m_id获取评分
getRatingByUidAndMid

5.增加评分
addRating
