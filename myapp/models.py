from django.db import models

class Movie(models.Model):
    """
    创建如下几个表的字段
    """
    # 电影id 字符串 最大长度10 不可为null 主键
    m_id = models.CharField( primary_key=True, max_length=10,null=False)
    # 电影名 字符串 最大长度24 不可为null
    m_name = models.CharField(max_length=40,null=False)
    # 评分 整数 最大长度11 不可为null
    rate = models.IntegerField(max_length=11,null=False)
    # 导演
    director = models.CharField(max_length=50,null=True)
    # 编剧
    screenwriter = models.CharField(max_length=50,null=True)
    # 演员
    actor = models.CharField(max_length=200,null=True)
    # 类型
    type = models.CharField(max_length=50,null=True)
    # 地区
    area = models.CharField(max_length=20, null=True)
    # 语言
    language = models.CharField(max_length=20, null=True)
    # 时长
    length  = models.IntegerField(max_length=11, null=True)
    # 图像链接
    imgurl = models.CharField(max_length=100, null=True)
    star = models.CharField(max_length=30, null=True)

    class Meta:
        db_table = 'movie'


class User(models.Model):
    """
    创建如下几个表的字段
    """
    # 用户id 字符串 最大长度32 不可为null 主键
    u_id = models.CharField( primary_key=True, max_length=32,null=False)
    # 密码
    u_passwd = models.CharField(max_length=50,null=False)
    # 手机号
    # phone = models.CharField(max_length=11,null=True)

    class Meta:
        db_table = 'user'


class RecommendMovie(models.Model):
    """
    创建如下几个表的字段
    """
    # 用户id 字符串 最大长度32 不可为null 主键
    m_id = models.CharField(primary_key=True, max_length=100,null=False)
    # 推荐电影id
    recommend_movie_id = models.CharField(max_length=10000,null=False)

    class Meta:
        db_table = 'recommend_movie'


class Rating(models.Model):
    """
    创建如下几个表的字段
    """
    # 用户id 字符串 最大长度32 不可为null 主键
    id = models.IntegerField(primary_key=True, max_length=11,null=False)
    # 用户id
    u_id = models.CharField(max_length=32,null=False)
    # 电影id
    m_id = models.CharField(max_length=10,null=False)
    # 类型
    type = models.CharField(max_length=50,null=True)
    # 评分
    rate = models.IntegerField(max_length=11,null=False)

    class Meta:
        db_table = 'rating'


class Comment(models.Model):
    """
    创建如下几个表的字段
    """
    # id
    id = models.IntegerField(primary_key=True, max_length=11,null=False)
    # 用户id
    u_id = models.CharField(max_length=32,null=False)
    # 电影id
    m_id = models.CharField(max_length=10,null=False)
    # 评论
    content = models.CharField(max_length=1000,null=False)

    class Meta:
        db_table = 'comment'
