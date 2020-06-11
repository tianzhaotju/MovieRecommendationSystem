package test
import org.apache.spark.streaming.StreamingContext
import org.apache.spark.streaming.dstream.{DStream, InputDStream}
import org.apache.spark.streaming.kafka010.KafkaUtils
import kafka.serializer.StringDecoder
import org.apache.spark.streaming.kafka010.LocationStrategies.PreferConsistent
import org.apache.spark.streaming.kafka010.ConsumerStrategies.Subscribe
import org.apache.kafka.clients.consumer.ConsumerRecord
import org.apache.kafka.common.serialization.StringDeserializer

object KafkaReceiverImpl {
   def getCellularDate(ssc: StreamingContext,t:String,path:String): DStream[String] = {
    val brokerList: String = path
    val topic: String = t


    //配置kafka相关参数
    /*
  val kafkaParams = Map[String, Object](
  "bootstrap.servers" -> "localhost:9092,anotherhost:9092",
  "key.deserializer" -> classOf[StringDeserializer],
  "value.deserializer" -> classOf[StringDeserializer],
  "group.id" -> "use_a_separate_group_id_for_each_stream",
  "auto.offset.reset" -> "latest",
  "enable.auto.commit" -> (false: java.lang.Boolean)
)     */
    val kafkaParams = Map(
        "bootstrap.servers" -> "localhost:9092",
        "metadata.broker.list" -> brokerList, 
        "key.deserializer" -> classOf[StringDeserializer],
        "value.deserializer" -> classOf[StringDeserializer],
        "group.id" -> "Kafka_Direct")
    //定义topic
    val topics = Set(topic)

    val dstream =
//      var lines = KafkaUtils.createDirectStream[String,String](ssc, PreferConsistent,Subscribe[String,String](topics,kafkaParams))
      KafkaUtils.createDirectStream(ssc, PreferConsistent, Subscribe[String,String](topics, kafkaParams))
//      KafkaUtils.createDirectStream[String, String, StringDecoder, StringDecoder](ssc, kafkaParams, topics)
    //获取kafka中topic中的数据
    val topicData: DStream[String] = dstream.map(record=>record.value())
    topicData.print()
//    topicData.map(x => {
//      logInfo("NTIT-从kafka接收到的信令：" + x)
//    })
    topicData

  }
}