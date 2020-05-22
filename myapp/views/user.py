from django.http import JsonResponse
from myapp.models import *
from django.shortcuts import HttpResponse
from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib import messages
from django.core import serializers

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

def exist_user(u_id):
        u_list = User.objects.filter(u_id=u_id)
        if len(u_list) !=0:
            return True
        return False
