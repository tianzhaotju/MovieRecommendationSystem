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

    // ��־����
    spark.sparkContext.setLogLevel("WARN")

    spark

  }
  def bootstraplocal : SparkSession = {
    // ���ñ������л���
    //System.setProperty("hadoop.home.dir", "E:/hadoop/hadoop-2.6.0")

    val spark = SparkSession.builder()
      .master("local[2]")
      .appName("neuedu")
      .config("spark.sql.warehouse.dir","file:///")//windows �¿�������
      .getOrCreate()

    // ��־����
    spark.sparkContext.setLogLevel("WARN")

    spark

  }
}