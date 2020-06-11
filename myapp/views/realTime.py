# -*- coding:utf-8 -*-
from myapp.models import *
from django.shortcuts import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib import messages
import requests as req
import json

def top5(request):
    print("top5")
    print(request.GET.get('num'))
    url = 'http://26335nw774.qicp.vip/top5'
    requests = req.get(url)
    s = str(requests.content, encoding = "utf-8")
    json_res = json.loads(s)
    # print(json_res)
    return JsonResponse(json_res)
