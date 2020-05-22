from myapp.models import *
from django.shortcuts import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib import messages
from django.core import serializers

def getCommentById(request):
    c_id = request.GET.get('c_id', '')
    c_list = Comment.objects.filter(id=c_id)
    if len(c_list) == 0:
        messages.error(request,'评论不存在！')
        return JsonResponse({'code':0})
    c_list = serializers.serialize("json", c_list)
    return JsonResponse({'code':1,'c_list':c_list})

def getCommentByMid(request):
    m_id = request.GET.get('m_id', '')
    c_list = Comment.objects.filter(m_id=m_id)
    if len(c_list) == 0:
        return JsonResponse({'code':0})
    c_list = serializers.serialize("json", c_list)
    return JsonResponse({'code':1,'c_list':c_list})

def getCommentByUid(request):
    u_id = request.GET.get('u_id', '')
    c_list = Comment.objects.filter(u_id=u_id)
    if len(c_list) == 0:
        return JsonResponse({'code':0})
    c_list = serializers.serialize("json", c_list)
    return JsonResponse({'code':1,'c_list':c_list})

def getCommentByUidAndMid(request):
    u_id = request.POST.get('u_id', '')
    m_id = request.POST.get('m_id', '')
    if u_id == '' or m_id == '':
        return JsonResponse({'code':0})
    c_list = Comment.objects.filter(u_id=u_id,m_id=m_id)
    if len(c_list) == 0:
        return JsonResponse({'code':0})
    c_list = serializers.serialize("json", c_list)
    return JsonResponse({'code': 1,'c_list':c_list})

def addComment(request):
    id = len(Comment.objects.all())
    u_id = request.POST.get('u_id','')
    m_id = request.POST.get('m_id','')
    content = request.POST.get('content','')
    if u_id == '' or m_id == '' or content == '':
        return JsonResponse({'code':0})
    Comment.objects.create(id=id,u_id=u_id,m_id=m_id,content=content)
    return JsonResponse({'code':1})
