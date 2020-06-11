package test
import java.text.SimpleDateFormat
import java.util.Calendar
import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.SaveMode
import org.apache.spark.SparkConf
import org.apache.spark.sql.types.{StringType, StructField, StructType}
import org.apache.spark.sql.{Row, SparkSession}
import org.apache.spark.streaming.{Seconds, StreamingContext}
import java.util.Properties
import java.sql.{PreparedStatement, Connection, DriverManager}

import test.Boot

object StreamingKafka {
  //case class news(uid:Int,mid:Int,rate:Int,num:Int)
  def main(args: Array[String]): Unit = {
    
//     val sjg_path = "data/基站经纬度数据.csv"
//     val jt_path="data/商业区数据.csv"  //jt=经，纬度  +  区域名称 ， kafka=  经纬度,id,time
//     val data_path = "data/原始数据.csv" 
//     val result_path = "data/ss_result"
    
    // val jt_path = args(1)
    // kafka的broker ip
     val broker_path ="localhost:9092"; // args(2)
     //bootstrap.servers
      
     val spark = Boot.bootstraplocal


    val ssc=new StreamingContext(spark.sparkContext,Seconds(30))
    val  cellularDStream =  KafkaReceiverImpl.getCellularDate(ssc,"test",broker_path)
    
    
    cellularDStream.foreachRDD(rdd=>{
      
      def myFun(iterator: Iterator[(String)]): Unit = {
        var conn: Connection = null
        var stmt: PreparedStatement = null
        try{
          //连接数据库
    val url="jdbc:mysql://localhost:336/new_schema?serverTimezone=UTC" 
   //?user=root&password=root123"
    val table="news"
    val driver="com.mysql.jdbc.Driver"
    val user = "root"
    val password = "zpy123456"
//    val props = new Properties()
//    props.setProperty("user", "root")
//    props.setProperty("password", "zpy123456")
//    props.setProperty("driver", driver)
    conn = DriverManager.getConnection(url, user, password)
    val sql = "insert into top5(mid,hot) values (?,?)"
    iterator.foreach(data => {
     
      var data_af=data.split(" ")
     
      val movielist =data_af.map(x => (x(1).toInt,1))
      val sc=spark.sparkContext.parallelize(movielist)
      sc.reduceByKey(_+_)
      val result=sc.sortBy(_._2).take(5)
     // println("data1:"+data_af(0).toInt+" data2:"+data_af(1).toInt+" data3:"+data_af(2).toInt)
      result.foreach(f=>{
      stmt = conn.prepareStatement(sql);
      stmt.setInt(1, f._1)
      stmt.setInt(2, f._2)
      } )
    
      
      
      stmt.executeUpdate()
    }  )
    
     }catch {
          case e: Exception => e.printStackTrace()
        }finally {
          if (stmt != null) {
            stmt.close()
          }
          if (conn != null) {
            conn.close()
          }
        }
      
    }
     val repartitionedRDD = rdd.repartition(3)
      repartitionedRDD.foreachPartition(myFun)
    }) 
      
//    var news_df=cellularDStream.map(r=>news(new Integer(r(0).toString())
//        ,new Integer(r(1).toString())
//        ,new Integer(r(2).toString())
//        ,new Integer(r(3).toString())
//    ))
   // news_df.createTempView("news")
    //news_df.show()

//  val rdd =   cellularDStream
  //   .window(Seconds(300),Seconds(30))//窗口函数
  //  .transform(rdd=>{  //对 Dstream 进行操作 得到的还是dstream
   // val DataFrame=rdd.map(x=>{
      // Row(x.split(",")(0).toString.trim,x.split(",")(1),x.split(",")(2),x.split(",")(3).trim)})
//
//      val schema = StructType(
//        StructField("time",StringType,false)::
//          StructField("imsi",StringType,false)::
//          StructField("longitude",StringType,false)::
//          StructField("latitude",StringType,false)::Nil)
//
    // val df_rl  = spark.createDataFrame(DataFrame,schema)
//
//      val df_rl_1 =  df_rl.selectExpr("imsi","time","concat(longitude,'-',latitude) as jwd")
//
//      val result =  df_rl_1.join(jtRDD,"jwd").select("imsi","time","name")
//
//      val result_count =  result.groupBy("name").count()
//
//      val result_show = result_count.orderBy(result_count("count").desc)
//
//      val calendar = Calendar.getInstance
//      val sb = new SimpleDateFormat("yyyyMMddHHmm")
//      val time = sb.format(calendar.getTime)
//      val sb1 = time.toLong
//      val b = String.valueOf(sb1)
//
//      result_show.coalesce(1).write.csv(result_path)
////      result_show.coalesce(1).write.csv("hdfs://"+args(0)+":9000/result/"+b)
//        result_show.rdd
//       // .map(x=>x.toString().replaceAll("\\[","").replaceAll("\\]",""))
//
//     }).print()

    ssc.start()
    ssc.awaitTermination()
    //ssc.stop()
  }
}