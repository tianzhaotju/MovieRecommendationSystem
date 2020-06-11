package ml

import java.util._
import org.apache.spark.ml.recommendation.ALS
import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.sql.SQLContext

object recommend {
  def main(args:Array[String]):Unit = {
//        val ss=SparkSession.builder()
//        .master("local")
//        .appName("t1")
//        .getOrCreate()
//        ss.sparkContext.setLogLevel("WARN")
//        import ss.implicits._
        //获取sparkSession
        val conf = new SparkConf().setAppName("MyRs").setMaster("local")
        //val sparkSession = new SparkSession(conf)
       // sparkSession.sparkContext.setLogLevel("WARN")
        //获取context
        val sparkContext =new  SparkContext(conf)
        val sqlContext = new SQLContext(sparkContext)
    
        import sqlContext.implicits._
        
        val url="jdbc:mysql://127.0.0.1:3306/movie_big_data"
        val table = "rating"
        val driver="com.mysql.cj.jdbc.Driver"
        val prop=new Properties()
        prop.setProperty("user","test")
        prop.setProperty("password", "123456")
        prop.setProperty("driver", driver)
        
         //读取数据库
        val df_t1 = sqlContext.read.jdbc(url, table, prop).drop("id","type")
        val df_t2 = sqlContext.read.jdbc(url, "user_num", prop)
        val df = df_t1.join(df_t2,"u_id").drop("u_id")
//        import sqlContext.implicits._ //导入这个为了隐式转换，或RDD转DataFrame之用
        import org.apache.spark.sql.types.DataTypes
        val df1 = df.withColumn("rate", $"rate".cast(DataTypes.FloatType))
                    .withColumn("u_num", $"u_num".cast(DataTypes.IntegerType))
                    .withColumn("m_id", $"m_id".cast(DataTypes.IntegerType))
//        df1.printSchema()
        
         //生成测试，训练集
        val Array(traning,test) = df1.randomSplit(Array(0.8,0.2))
        //进行模型训练
        val als = new ALS()
          .setMaxIter(1)
          .setUserCol("u_num")
          .setItemCol("m_id")
          .setRatingCol("rate")
          .setRegParam(0.01)//正则化参数
        val model = als.fit(traning)
        //model.setColdStartStrategy("drop")
        //model.write.overwrite().save("./ColleborativeFilterModle")
    
      //得出测试集的推荐结果
        val predictions = model.transform(test)
        predictions.show()
        //spark2.3.0之后可以用如下代码进行推荐
        //model.recommendForUserSubset(user1,10).show(false)
        //model.recommendForAllUsers(10)
       
        sparkContext.stop()
  }
}