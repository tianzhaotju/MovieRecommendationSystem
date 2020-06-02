import os
import django
from django.shortcuts import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib import messages
from django.core import serializers
import json
from urllib import request as req
import requests
import operator
import numpy as np
from bs4 import BeautifulSoup
from lxml.html import etree
import pymysql
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36'}
# 建立数据库连接
conn=pymysql.connect(
    host='127.0.0.1',
    port=3306,
    user='root',
    password='tian',
    db='rec_movie',
    charset='utf8'
)
cursor=conn.cursor()
# 执行sql语句
sql1 = 'select * from movie '
rows=cursor.execute(sql1)  # 返回结果是受影响的行数
m_id_list = []
imgurl_list = []
for i in range(rows):
    a = cursor.fetchone()
    m_id = str(a[0])
    cover = str(a[-2])
    m_id_list.append(m_id)
    imgurl_list.append(cover)

for i in range(len(m_id_list)):
    releaseDate = '0000-00-00'
    cover = str(imgurl_list[i])
    m_id = m_id_list[i]
    try:
        response = requests.get('https://movie.douban.com/subject/' + m_id + '/',headers=headers)
        response.encoding = 'utf-8'
        soup = BeautifulSoup(response.text, "html.parser")
        releaseDate = soup.find("span", attrs={"property": "v:initialReleaseDate"}).get_text()
        releaseDate = releaseDate.split('(')[0]
        cover = etree.HTML(response.text).xpath('//img/@src')[0]
    except:
        pass

    sql2 = 'update movie set star = %s, imgurl = %s where m_id = %s'
    row = cursor.execute(sql2, (releaseDate,cover, m_id))
    # 提交
    conn.commit()

# 关闭游标
cursor.close()
# 关闭连接
conn.close()
