"""myapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from django.views.generic import TemplateView
from myapp.views import comment,test,movie,rating,recommendMovie,user
from myapp import views
from django.http import HttpResponse
urlpatterns = [
    # path('admin/', admin.site.urls),
    url(r'^$', TemplateView.as_view(template_name="index.html")),
    url(r'test', views.test.test, name = 'test'), #测试用
    # 用户
    url('userRegister/', views.user.userRegister, name = 'userRegister'),
    url('userLogin/', views.user.userLogin, name = 'userLogin'),
    url('getUserInfo/', views.user.getUserInfo, name = 'getUserInfo'),
    # 电影
    url('getMovieById/', views.movie.getMovieById, name = 'getMovieById'),
    url('getMovieByName/', views.movie.getMovieByName, name = 'getMovieByName'),
    url('getMovieByType/', views.movie.getMovieByType, name = 'getMovieByType'),
    url('searchMovie/', views.movie.searchMovie, name = 'searchMovie'),
    # 评论
    url('getCommentById/', views.comment.getCommentById, name = 'getCommentById'),
    url('getCommentByMid/', views.comment.getCommentByMid, name = 'getCommentByMid'),
    url('getCommentByUid/', views.comment.getCommentByUid, name = 'getCommentByUid'),
    url('getCommentByUidAndMid/', views.comment.getCommentByUidAndMid, name = 'getCommentByUidAndMid'),
    url('addComment/', views.comment.addComment, name = 'addComment'),
    # 评分
    url('getRatingById/', views.rating.getRatingById, name = 'getRatingById'),
    url('getRatingByMid/', views.rating.getRatingByMid, name = 'getRatingByMid'),
    url('getRatingByUid/', views.rating.getRatingByUid, name = 'getRatingByUid'),
    url('getRatingByUidAndMid/', views.rating.getRatingByUidAndMid, name = 'getRatingByUidAndMid'),
    url('addRating/', views.rating.addRating, name = 'addRating'),

]
