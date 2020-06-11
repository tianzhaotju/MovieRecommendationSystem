package testProject;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeUnit;


public class Handler implements Runnable {
    private String current_time;
    private Producer producer;
    private String path_csv;
    private String broker;

	public Handler(String current_time, Producer producer, String broker, String path_csv) {
		// TODO Auto-generated constructor stub
		this.current_time = current_time;
        this.producer = producer;
        this.path_csv = path_csv;
        this.broker = broker;
	}



	@Override
    public void run() {
        Configuration conf = new Configuration();
//        conf.set("fs.defaultFS", "hdfs://"+broker+":9000/");
//        conf.set("fs.hdfs.impl", "org.apache.hadoop.hdfs.DistributedFileSystem");
//        Path path = new Path("hdfs://"+broker+":9000"+path_csv);
        Path path = new Path(path_csv);
        FileSystem fs = null;
        try {
            fs = FileSystem.get(conf);
        } catch (IOException e) {
            e.printStackTrace();
        }

        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(fs.open(path)));
        } catch (IOException e) {
            e.printStackTrace();
        }
        List<String> result = new ArrayList<>();
        String line;

        //0.11  >0.8
        try {
            while ((line = reader.readLine()) != null) {
            	TimeUnit.SECONDS.sleep(1);
            	producer.send(new ProducerRecord("test",line));
            	
                //String time_id = line.split(",")[0];
                //String time2 = time_id.substring(8, 12);
//                if(time2.equalsIgnoreCase(current_time)) {
//                    
//                }
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}