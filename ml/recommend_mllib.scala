package ml
import org.apache.spark.sql.SparkSession
import java.util._
import org.apache.spark.mllib.recommendation.{ALS, MatrixFactorizationModel, Rating}
import org.apache.spark.rdd.RDD
import org.apache.spark.rdd.RDD.rddToPairRDDFunctions
import org.apache.spark.mllib.recommendation.MatrixFactorizationModel

object recommend_mllib {
  case class Uer_rec(u_num:Int,u_id:String,m_id:String)
  case class Uer_num(u_num:Int,u_id:String)
  case class U_m(u_num:Int,m_ids:String)
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
        var modelpath = "./ColleborativeFilterModle"
        val model = MatrixFactorizationModel.load(ss.sparkContext, modelpath)

        val movie_num = 5
        val rdd = model.recommendProductsForUsers(movie_num).map(r=>{
                      var str = r._2(0).product.toString()
                      for(i <- 1 to movie_num-1){
                        str += "," + r._2(i).product
                      }
                      (r._1,str)
                  })
        val um_df = rdd.map(x=>U_m(x._1,x._2)).toDF()
        val result = df_t2.join(um_df,"u_num")
        result.printSchema()
        result.show()
//        result.write.mode("overwrite").jdbc(url, "user_recommend",prop)
        
        ss.stop()
  }
  
  
  
  
  
  def evaluateALLParameter(trainData:RDD[Rating], validationData:RDD[Rating],ranks:Array[Int],its:Array[Int],lamdas:Array[Double]):(Double,(Int,Int,Double))= {

    var bestrmse=Double.MaxValue
    var pData =""
    var best_rank = 1
    var best_it = 1
    var best_lamda = 0.1
    for (rank <- ranks; it <- its; lamda <- lamdas) {
      val rmse = trainModel(trainData, validationData, rank, it, lamda)
      if(rmse<bestrmse){
        bestrmse=rmse
        pData = "rank:" + rank+" it:" + it+" lamda:" + lamda
        best_rank = rank
        best_it = it
        best_lamda = lamda
      }
    }
    println(pData)
    (bestrmse, (best_rank,best_it,best_lamda))
  }

  def trainValidation(trainData:RDD[Rating], validationData:RDD[Rating]): (Double,(Int,Int,Double)) =
  {
    val bestModel=evaluateALLParameter(trainData,validationData, Array(5,10,15,20,50,100), Array(5,10,15,20,25), Array(0.05,0.1,1,5,10.0))
    return (bestModel)
  }
  
  def trainModel(trainData:RDD[Rating], validationData:RDD[Rating],rank:Int,it:Int,lambda:Double):Double={
    val model=ALS.train(trainData,rank,it,lambda)
    val rmse=computeRmse(model,validationData)
    (rmse)
  }
  
  def computeRmse(model:MatrixFactorizationModel,validationData:RDD[Rating]):Double =
  {
    val num = validationData.count
    val predictedRDD = model.predict(validationData.map(x=>(x.user,x.product)))
    val predictedAndRatings = predictedRDD.map(p=>((p.user,p.product),p.rating)).join(validationData.map(x=>((x.user,x.product),x.rating))).values
    return(math.sqrt(predictedAndRatings.map(x=>(x._1-x._2)*(x._1-x._2)).reduce(_+_)/num))
  }
}