---
title: Hadoop upload file by java
icon: page
order: 1
author: Jelly
date: 2022-12-20
category:
  - Hadoop
tag:
  - Hadoop
sticky: false
star: false
---

在之前的hadoop配置基础上, 现在来做一个上传文件到hadoop系统的java程序

<!-- more -->

之前的教程使用的 `~/hadoop` 作为hadoop的根目录似乎有点不直观, 现在在 `~/.bashrc` 里增加 hadoop 根目录作为 `HADOOP_HOME`.
```sh
echo "export HADOOP_HOME=~/hadoop" >> ~/.bashrc && source ~/.bashrc
```

可以先创建一个用于存放程序的目录
```sh
mkdir $HADOOP_HOME/programs
```

然后创建一个 `UploadFile.java` 文件
```sh
touch $HADOOP_HOME/programs/UploadFile.java
```

UploadFile.java的内容为
```java
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

public class UploadFile {
    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        FileSystem fs = FileSystem.newInstance(new URI("hdfs://misaka0:9000"), conf, "hadoop");
        Path src = new Path("./access.log");
        Path dis = new Path("/tmp");
        fs.copyFromLocalFile(false, false, src, dis);
        fs.close();
    }
}
```

然后编译这段代码
```sh
javac -classpath $HADOOP_HOME/share/hadoop/common/hadoop-common-3.2.4.jar $HADOOP_HOME/programs/UploadFile.java
```

经过上一个命令后, 会产生一个 `UploadFile.class` 文件, 接着对UploadFile进行打包
```sh
jar -cvf $HADOOP_HOME/programs/UploadFile.jar $HADOOP_HOME/programs/UploadFile.class
```

上述过程就把一会要用的程序准备好了, 接下来要在hadoop系统内创建一个 `tmp` 目录
```sh
hdfs dfs -mkdir /tmp
```

然后再创建一个 `access.log` 文件
```sh
touch $HADOOP_HOME/programs/access.log
```

接着在上述 `access.log` 文件所在的目录里运行我们打包好的程序, 执行成功无输出
```sh
hadoop jar $HADOOP_HOME/programs/UploadFile.jar UploadFile
```

最后查看是否上传成功
```sh
hdfs dfs -ls /tmp
```