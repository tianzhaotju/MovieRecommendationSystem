from myapp.models import *
from django.shortcuts import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib import messages
from django.core import serializers

def getRecommendMovieByMid(request):
    m_id = '10047547'
    rec_list = RecommendMovie.objects.filter(m_id=m_id)

    if len(rec_list) == 1:
        recommend_movie_id = rec_list[0].recommend_movie_id
        rec_list = recommend_movie_id.split(',')
        # rec_list = serializers.serialize("json", rec_list)
        return JsonResponse({'code': 1, 'rec_list': rec_list})
    else:
        return JsonResponse({'code': 0})

