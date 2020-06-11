import random

import pymysql
if __name__ == '__main__':

    conn = pymysql.connect(host="localhost",
                           port=336,
                           user="root",
                           password="zpy123456",
                           database="new_schema",
                           charset="utf8")
    cursor = conn.cursor()
    sql="select m_id from movie limit 1000"
    cursor.execute(sql)
    ret = cursor.fetchall()

    midlist=[]
    for i in ret:
        midlist.append(i[0])
    print(midlist)

    sql2="select u_id from user limit 100"
    cursor.execute(sql2)
    ret2=cursor.fetchall()
    uidlist=[]
    for i in ret2:
        uidlist.append(i[0])
    print(uidlist)
    print(random.choice(uidlist))

    f=open("E:/new/u.txt","w")
    for i in uidlist:
        f.write(str(i)+" "+str(random.choice(midlist))+"\n")
    f.close()

