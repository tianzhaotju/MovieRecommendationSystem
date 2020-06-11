package testProject;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Properties;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;


//kafka.producer.Producer

//kafka-2.11-0.8  >0.9
public class TestProducer {
    public static void main(String args[]){
    	
         String broker = "localhost";   // args[0] ;
         String path_csv = "E:\\new\\u.txt";//args[1] ;
        Properties properties = new Properties();
//        properties.put("bootstrap.servers",broker+":9092");
        properties.put("bootstrap.servers","localhost:9092");
        properties.put("key.serializer","org.apache.kafka.common.serialization.StringSerializer");
        properties.put("value.serializer","org.apache.kafka.common.serialization.StringSerializer");

        Producer producer = new KafkaProducer(properties);

        try{
            ExecutorService executorService = Executors.newFixedThreadPool(10);
            while(true) {
                Calendar calendar = Calendar.getInstance();
                SimpleDateFormat ss = new SimpleDateFormat("ddHHmm");
                String time_mm = ss.format(calendar.getTime());
                int i1 = Integer.parseInt(time_mm);
                String a= String.valueOf(i1);
                String current_time=  a.substring(a.length()-4,a.length());
                executorService.execute(new Handler(current_time,producer,broker,path_csv));
                TimeUnit.SECONDS.sleep(30);
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        finally {
            producer.close();
        }
    }


}
