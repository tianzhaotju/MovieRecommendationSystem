package ml
import org.apache.spark.sql.SparkSession
import java.util._
import org.apache.spark.mllib.recommendation.{ALS, MatrixFactorizationModel, Rating}
import org.apache.spark.rdd.RDD
import org.apache.spark.rdd.RDD.rddToPairRDDFunctions

object select_best_model {
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
        
         //读取数据库
//        val df_t1 = ss.read.jdbc(url, table, prop).drop("id","type")
//        val df_t2 = ss.read.jdbc(url, "user_num", prop)
//        val df = df_t1.join(df_t2,"u_id").drop("u_id")
        val df1 = ss.read.jdbc(url, "training", prop)
        val df2 = ss.read.jdbc(url, "validation", prop)
        val df3 = ss.read.jdbc(url, "testdata", prop)
        
         val trainData = df1.rdd
                       .map{r=>
                            new Rating(r(2).toString().toInt, r(0).toString().toInt, r(1).toString().toDouble)
                            }
        val validationData = df2.rdd
                       .map{r=>
                            new Rating(r(2).toString().toInt, r(0).toString().toInt, r(1).toString().toDouble)
                            }
        val testData = df3.rdd
                       .map{r=>
                            new Rating(r(2).toString().toInt, r(0).toString().toInt, r(1).toString().toDouble)
                            }
        
        //rank(5   ,10,15,    20,    50,100), iter(5,10,15,20,25), lamda(0.01)
        val result = trainModel(trainData,testData,100,20,0.01)
        println(result)
//        val Array(trainData,validationData,testData) = rating.randomSplit(Array(0.8,0.1,0.1))
//        
//        val bestmodel = trainValidation(trainData,validationData)
//        
//        val result = trainModel(trainData,testData,bestmodel._2._1,bestmodel._2._2,bestmodel._2._3)
//        
//        println("最优模型在测试集上的mse"+result)
  }
  
  
  
  def evaluateALLParameter(trainData:RDD[Rating], validationData:RDD[Rating],ranks:Array[Int],its:Array[Int],lamdas:Array[Double]):(Double,(Int,Int,Double))= {

    var bestrmse=Double.MaxValue
    var pData =""
    var best_rank = 1
    var best_it = 1
    var best_lamda = 0.1
    for (rank <- ranks; it <- its; lamda <- lamdas) {
      val rmse = trainModel(trainData, validationData, rank, it, lamda)
      println(rmse)
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
    val bestModel=evaluateALLParameter(trainData,validationData, Array(5,10,15,20,50,100), Array(5,10,15,20,25), Array(0.01))
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