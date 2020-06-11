package test
import org.apache.spark.SparkConf
import org.apache.spark.sql.SparkSession

object Boot {
  def bootstrap(args:Array[String]) : SparkSession = {


    val sc = new SparkConf()
       sc.setMaster("spark://"+args(0)+":7077")
      .setAppName("neusoft")

    val spark = SparkSession.builder()
      .config(sc)
      .config("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
      .enableHiveSupport()
      .getOrCreate()

    // 日志级别
    spark.sparkContext.setLogLevel("WARN")

    spark

  }
  def bootstraplocal : SparkSession = {
    // 配置本地运行环境
    //System.setProperty("hadoop.home.dir", "E:/hadoop/hadoop-2.6.0")

    val spark = SparkSession.builder()
      .master("local[2]")
      .appName("neuedu")
      .config("spark.sql.warehouse.dir","file:///")//windows 下开发配置
      .getOrCreate()

    // 日志级别
    spark.sparkContext.setLogLevel("WARN")

    spark

  }
}