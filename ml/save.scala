package ml
import org.apache.spark.sql.SparkSession
import java.util._

object save {
  case class Uer_rec(u_num:Int,u_id:String,m_id:String)
  def main(args: Array[String]): Unit = {
       
        val ss = SparkSession.builder()
                    .master("local")
                    .appName("t1")
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
        
         //¶ÁÈ¡Êý¾Ý¿â¯»
        val df_t1 = ss.read.jdbc(url, table, prop).drop("id","type")
        val df_t2 = ss.read.jdbc(url, "user_num", prop)
        val df = df_t1.join(df_t2,"u_id").drop("u_id")
        
        val Array(training,validation,test) = df.randomSplit(Array(0.8,0.1,0.1))
        training.toDF()
        training.printSchema()
        training.show()
        training.write.mode("overwrite").jdbc(url, "training", prop)
        
        validation.toDF()
        validation.write.mode("overwrite").jdbc(url, "validation", prop)
        
        test.toDF()
        test.write.mode("overwrite").jdbc(url, "testData", prop)
        
        ss.stop()
  }
}