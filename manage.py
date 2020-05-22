#!/usr/bin/env python
import os
import sys

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myapp.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

# python == 3.6
# Django == 2.1.7
# pip install django-cors-headers
# npm install webpack webpack-dev-server webpack-cli --save-dev
# npm install axios --save
#启动
# python manage.py runserver 0.0.0.0:8888

#更新
# 创建表结构
#python manage.py makemigrations
# 创建数据库表
#python manage.py migrate

# 占用端口
# ps aux | grep -i manage
# kill -9 PID

