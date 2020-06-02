from django.http import JsonResponse
from myapp.models import *
from django.shortcuts import HttpResponse
from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib import messages
from django.core import serializers
import pymysql
import json
from urllib import request as req


class Movie_():
    movieId = ''
    name = ''
    actors = ''
    cover = ''
    directors = ''
    genres = ''
    officialSite = ''
    regions = ''
    languages = ''
    mins = ''
    score = ''
    votes = ''
    tags = ''
    storyline = ''
    year = ''
    actorIds = ''
    directorIds = ''
    releaseDate = ''

def find(request):
    #sql = 'select * from student'
    # django 也可以执行原生的sql语句
    #result = Student.objects.raw(sql)

    # 查询name = tom1的数据
    result = User.objects.filter(u_id='10001162')
    """
    result为<class 'django.db.models.query.QuerySet'>的对象
    需要进行数据处理
    """
    arr = []
    for i in result:
        content = {'u_id': i.u_id, 'u_passwd': i.u_passwd}
        arr.append(content)
        arr.append(content)
    print(arr)
    print(type(arr))
    # return HttpResponse(arr)
    return render(request, 'moviefront/test.html', {'List':arr})

def userRegister(request):
    u_id = request.POST.get('u_id', '')
    u_passwd = request.POST.get('u_passwd', '')
    if exist_user(u_id):
        messages.error(request,'用户id已存在！')
        # return redirect('/')
        return JsonResponse({'code':0})
    User.objects.create(u_id=u_id,u_passwd=u_passwd)
    # return redirect('login.html')
    return JsonResponse({'code':1})

def userLogin(request):
    u_id = request.POST.get('u_id', '')
    u_passwd = request.POST.get('u_passwd', '')
    u_list = User.objects.filter(u_id=u_id,u_passwd=u_passwd)

    if exist_user(u_id)==False:
        messages.error(request,'用户id不存在！')
        return JsonResponse({'code':0})
    if len(u_list) == 1:
        return JsonResponse({'code':1})
    else:
        messages.error(request,'密码错误！')
        return JsonResponse({'code':0})

def getUserInfo(request):
    u_id = request.GET.get('u_id', '')
    u_list = User.objects.filter(u_id=u_id)
    u_list = serializers.serialize("json", u_list)
    return JsonResponse({'code':1,'u_list':u_list})

def getUserMovie(request):
    print("############################")
    print("getUserMovie")
    u_id = request.GET.get('id','')
    count = int(request.GET.get('count',''))
    print(u_id)
    print(count)
    m_list = []
    # 建立数据库连接
    conn = pymysql.connect(
        host='127.0.0.1',
        port=3306,
        user='root',
        password='tian',
        db='rec_movie',
        charset='utf8'
    )
    cursor = conn.cursor()
    sql1 = 'select * from user_recommend where u_id = %s'
    rows = cursor.execute(sql1,(u_id))
    m_id_list = str(cursor.fetchone()[2]).split(',')
    for m_id in m_id_list:
        for i in Movie.objects.filter(m_id=m_id):
            m_list.append(i)
    print(len(m_list))
    index = 0
    res = []
    for i in m_list:
        x =Movie_()
        try:
            if req.urlopen(i.imgurl).status == 200:
                x.cover = i.imgurl
            else:
                continue
        except:
            continue

        x.movieId = int(i.m_id)
        x.name = i.m_name
        x.actors = i.actor
        x.cover = i.imgurl
        x.directors = i.director
        x.genres = i.type+' '+i.actor
        x.officialSite = 'https://v.qq.com/'
        x.regions = i.area
        x.languages = i.language
        x.mins = i.length
        x.score = i.rate
        x.votes = 1
        x.tags = i.type
        x.storyline = ''
        x.year = ''
        x.actorIds = ''
        x.directorIds = ''
        x.releaseDate = ''

        index+=1
        res.append(x)
        if index >= 6*count:
            break

    if len(res) >= 6*count:
        res = res[6*(count-1):6*count]
    elif len(res) >= 6*(count-1):
        res = res[6 * (count-1):]
    else:
        res = []
    m_list = json.dumps(res,default=lambda obj:obj.__dict__)
    # 关闭游标
    cursor.close()
    # 关闭连接
    conn.close()
    return JsonResponse({'code':1,'m_list':m_list})


def exist_user(u_id):
        u_list = User.objects.filter(u_id=u_id)
        if len(u_list) !=0:
            return True
        return False
