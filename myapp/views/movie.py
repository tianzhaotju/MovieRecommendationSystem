from myapp.models import *
from django.shortcuts import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib import messages
from django.core import serializers
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

def getMovieById(request):
    m_id = request.GET.get('m_id', '')
    m_list = Movie.objects.filter(m_id=m_id)
    if len(m_list) == 0:
        return JsonResponse({'code':0})
    m_list = serializers.serialize("json", m_list)
    return JsonResponse({'code':1,'m_list':m_list})

def getMovieByName(request):
    m_name = request.GET.get('m_name', '')
    m_list = Movie.objects.filter(m_name=m_name)
    if len(m_list) == 0:
        return JsonResponse({'code':0})
    m_list = serializers.serialize("json", m_list)
    return JsonResponse({'code':1,'m_list':m_list})

def getMovieByType(request):
    print("############################")
    print("getMovieByType")
    type = request.GET.get('type','')
    count = int(request.GET.get('count',''))
    print(count)
    print(type)
    m_list = Movie.objects.filter(type__contains=type)
    if len(m_list) == 0:
        messages.error(request,'电影不存在！')
        return JsonResponse({'code':0})

    m_list = m_list[12*(count-1):12*count]
    res = []
    for i in m_list:
        x =Movie_()
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
        res.append(x)
        try:
            if req.urlopen(i.imgurl).status == 200:
                x.cover = i.imgurl
            else:
                x.cover = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589887458475&di=38b6dbf53b6505b7a5cb3764c1857313&imgtype=0&src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fgroup_topic%2Flarge%2Fpublic%2Fp108048762.jpg'
        except:
            x.cover = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589887458475&di=38b6dbf53b6505b7a5cb3764c1857313&imgtype=0&src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fgroup_topic%2Flarge%2Fpublic%2Fp108048762.jpg'
    # m_list = serializers.serialize("json", res)
    m_list = json.dumps(res,default=lambda obj:obj.__dict__)
    return JsonResponse({'code':1,'m_list':m_list})


def searchMovie(request):
    print("############################")
    print("searchMovie")
    tag = request.GET.get('tag','')
    count = int(request.GET.get('count',''))
    print(count)
    m_list1 = Movie.objects.filter(type__contains=tag)
    m_list2 = Movie.objects.filter(m_name__contains=tag)
    print(m_list2)
    m_list3 = Movie.objects.filter(director__contains=tag)
    m_list4 = Movie.objects.filter(screenwriter__contains=tag)
    m_list5 = Movie.objects.filter(actor__contains=tag)
    m_list6 = Movie.objects.filter(area__contains=tag)
    m_list7 = Movie.objects.filter(language__contains=tag)
    m_list8 = Movie.objects.filter(language__contains=tag)
    print(type(m_list1))
    m_list = []
    for i in m_list1:
        m_list.append(i)
    for i in m_list2:
        m_list.append(i)
    for i in m_list3:
        m_list.append(i)
    for i in m_list4:
        m_list.append(i)
    for i in m_list5:
        m_list.append(i)
    for i in m_list6:
        m_list.append(i)
    for i in m_list7:
        m_list.append(i)
    for i in m_list8:
        m_list.append(i)
    if len(m_list) == 0:
        messages.error(request,'电影不存在！')
        return JsonResponse({'code':0})

    m_list = m_list[12*(count-1):12*count]
    res = []
    for i in m_list:
        x =Movie_()
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
        res.append(x)
        try:
            if req.urlopen(i.imgurl).status == 200:
                x.cover = i.imgurl
            else:
                x.cover = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589887458475&di=38b6dbf53b6505b7a5cb3764c1857313&imgtype=0&src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fgroup_topic%2Flarge%2Fpublic%2Fp108048762.jpg'
        except:
            x.cover = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589887458475&di=38b6dbf53b6505b7a5cb3764c1857313&imgtype=0&src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fgroup_topic%2Flarge%2Fpublic%2Fp108048762.jpg'
    # m_list = serializers.serialize("json", res)
    m_list = json.dumps(res,default=lambda obj:obj.__dict__)
    return JsonResponse({'code':1,'m_list':m_list})



def exist_movie(m_id):
    m_list = Movie.objects.filter(m_id=m_id)
    if len(m_list) != 0:
        return True
    return False
