from myapp.models import *
from django.shortcuts import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib import messages
from django.core import serializers

def getRatingById(request):
    r_id = request.GET.get('r_id', '')
    r_list = Rating.objects.filter(id=r_id)
    if len(r_list) == 0:
        messages.error(request,'评论不存在！')
        return JsonResponse({'code':0})
    r_list = serializers.serialize("json", r_list)
    return JsonResponse({'code':1,'r_list':r_list})

def getRatingByMid(request):
    m_id = request.GET.get('m_id', '')
    r_list = Rating.objects.filter(m_id=m_id)
    if len(r_list) == 0:
        return JsonResponse({'code':0})
    r_list = serializers.serialize("json", r_list)
    return JsonResponse({'code':1,'r_list':r_list})

def getRatingByUid(request):
    u_id = request.GET.get('u_id', '')
    r_list = Rating.objects.filter(u_id=u_id)
    if len(r_list) == 0:
        return JsonResponse({'code':0})
    r_list = serializers.serialize("json", r_list)
    return JsonResponse({'code':1,'r_list':r_list})

def getRatingByUidAndMid(request):
    u_id = request.POST.get('u_id', '')
    m_id = request.POST.get('m_id', '')
    if u_id == '' or m_id == '':
        return JsonResponse({'code':0})
    r_list = Rating.objects.filter(u_id=u_id,m_id=m_id)
    if len(r_list) == 0:
        return JsonResponse({'code':0})
    r_list = serializers.serialize("json", r_list)
    return JsonResponse({'code': 1,'r_list':r_list})

def addRating(request):
    id = len(Comment.objects.all())
    u_id = request.POST.get('u_id','')
    m_id = request.POST.get('m_id','')
    type = request.POST.get('type','')
    rate = request.POST.get('rate','')
    if u_id == '' or m_id == '' or rate == '':
        return JsonResponse({'code':0})
    Rating.objects.create(id=id,u_id=u_id,m_id=m_id,type=type,content=rate)
    return JsonResponse({'code':1})
