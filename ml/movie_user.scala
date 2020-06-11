package ml
import org.apache.spark.sql.SparkSession
import java.util._
import org.apache.spark.mllib.recommendation.{ALS, MatrixFactorizationModel, Rating}
import org.apache.spark.rdd.RDD
import org.apache.spark.rdd.RDD.rddToPairRDDFunctions
import org.apache.spark.mllib.recommendation.MatrixFactorizationModel

object movie_user {
  case class Uer_rec(u_num:Int,u_id:String,m_id:String)
  case class Uer_num(u_num:Int,u_id:String)
  case class U_m(u_num:Int,m_ids:String)
  case class M_u(mid:Int,u_nums:String)
  def main(args:Array[String]):Unit = {
        val ss=SparkSession.builder()
        .master("local")
        .appName("t2")
        .getOrCreate()
        ss.sparkContext.setLogLevel("WARN")
        import ss.implicits._
        val url="jdbc:mysql://127.0.0.1:3306/movie_big_data"
        val table = "rating"
        val driver="com.mysql.cj.jdbc.Driver"
        val prop=new Properties()
        prop.setProperty("user","test")
        prop.setProperty("password", "123456")
        prop.setProperty("driver", driver)
        
         //��ȡ���ݿ⯻
        val df_t1 = ss.read.jdbc(url, table, prop).drop("id","type")
        val df_t2 = ss.read.jdbc(url, "user_num", prop)
        val df = df_t1.join(df_t2,"u_id").drop("u_id")
//        import sqlContext.implicits._ //�������Ϊ����ʽת������RDDתDataFrame֮��
        import org.apache.spark.sql.types.DataTypes
//        val df1 = df.withColumn("rate", $"rate".cast(DataTypes.DoubleType))
//                    .withColumn("u_num", $"u_num".cast(DataTypes.IntegerType))
//                    .withColumn("m_id", $"m_id".cast(DataTypes.IntegerType))
//        df1.printSchema
        val rating = df.rdd
                       .map{r=>
                            new Rating(r(2).toString().toInt, r(0).toString().toInt, r(1).toString().toDouble)
                            }
//        val model=ALS.train(rating, 100, 15,0.01)
//        model.save(ss.sparkContext,"./ColleborativeFilterModle")
//        
         var modelpath = "./{ColleborativeFilterModle/*}"
         val model = MatrixFactorizationModel.load(ss.sparkContext, modelpath)
         model.productFeatures.foreach(println)
       
//        val user_num = 5
//        val rdd = model.recommendUsersForProducts(user_num).map(r=>{
//                      var str = r._2(0).user.toString()
//                      for(i <- 1 to user_num-1){
//                        str += "," + r._2(i).user
//                      }
//                      (r._1,str)
//                  })
//        val um_df = rdd.map(x=>M_u(x._1,x._2)).toDF()
////        val result = df_t2.join(um_df,"u_num")
//        um_df.printSchema()
//        um_df.show()
//        um_df.write.mode("overwrite").jdbc(url, "movie_recommend_user",prop)
        
        ss.stop()
  }
}