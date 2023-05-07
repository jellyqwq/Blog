---
title: Hadoop setup
icon: page
order: 1
author: Jelly
date: 2022-12-15
category:
  - Hadoop
tag:
  - Hadoop
sticky: false
star: false
---

...

<!-- more -->

### 前言
本文记录了hadoop集群安装的相应细节, 需要您具备一定的Linux命令常识, 同时, 本文的运行环境为docker centos7, 基于[docker-install-centos7](/code/language/docker/docker-install-centos7.md)

### 安装java

```sh

# 将java的压缩包从宿主机上挂载的目录上复制过来
cp ~/package/jdk-8u161-linux-x64.tar.gz ~/

# 解压
# [-x] 解压
# [-z] 有gzip属性的
# [-v] 显示过程
# [-f] 最后一个参数, 后接档案
# [-C] 指定目标目录
tar -xzvf ~/jdk-8u161-linux-x64.tar.gz ~C ~/

# 重命名解压目录
mv ~/jdk1.8.0_161 ~/java

# 为java的bin目录和java包所在目录追加到环境变量
echo 'export PATH=$PATH:~/java/bin'>>~/.bashrc
echo 'export JAVA_HOME=~/java'>>~/.bashrc

# 刷新环境变量
source ~/.bashrc

# 使用java的命令查看是否配置成功
jps
```

---

### 安装zookeeper

```sh
cp ~/package/apache-zookeeper-3.5.10-bin.tar.gz ~/
tar -xzf ~/apache-zookeeper-3.5.10-bin.tar.gz -C ~/
mv ~/apache-zookeeper-3.5.10-bin ~/zookeeper
echo 'export PATH=$PATH:~/zookeeper/bin'>>~/.bashrc
source ~/.bashrc
```

### 配置

在zookeeper下创建目录data
```sh
mkdir ~/zookeeper/data
```

备份并修改zookeeper配置文件
```sh
cp ~/zookeeper/conf/zoo_sample.cfg ~/zookeeper/conf/zoo.cfg
sed -i "s#dataDir=.*#dataDir=~/zookeeper/data#g" ~/zookeeper/conf/zoo.cfg
echo 'server.0=192.168.60.10:2888:3888'>>~/zookeeper/conf/zoo.cfg
echo 'server.1=192.168.60.11:2888:3888'>>~/zookeeper/conf/zoo.cfg
echo 'server.2=192.168.60.12:2888:3888'>>~/zookeeper/conf/zoo.cfg
```

在data目录下创建文件myid, 并写入一个id, 由于我的hostname是**misaka+number**, 所以直接使用number作为id
```sh
touch ~/zookeeper/data/myid
echo $HOSTNAME | echo ${HOSTNAME/misaka/}>>~/zookeeper/data/myid
```

### 使用

启动 & 关闭
```sh
zkServer.sh [start|stop]
```

### zookeeper作用
1. zookeeper动态决定由哪台机器对外, 提供统一的资源服务
2. 资源的动态同步

参考资料: [Zookeeper 集群安装配置](https://segmentfault.com/a/1190000017893271)

---
### hadoop安装

1. 解压
2. 配置bin和sbin到环境变量~/.bashrc
3. 配置文件~/hadoop/etc/hadoop/core-site.xml 
```xml
<configuration>
    <property>
            <name>fs.defaultFS</name>
            <value>hdfs://misaka0:9000</value>
    </property>
    <property>
            <name>hadoop.tmp.dir</name>
            <value>~/hadoop/temp</value>
    </property> 
</configuration>
```
4. 随后在~/hadoop下创建目录temp, 目录data/datanode, 目录data/namenode
5. 配置文件 `~/hadoop/etc/hadoop/hdfs-site.xml` , `dfs.nodename.http.address` 参数是用于开启webUI的, `dfs.replication` 是用于设置备份数的
```xml
<configuration>
        <property>
                <name>dfs.namenode.name.dir</name>
                <value>~/hadoop/data/namenode</value>
        </property>
        <property>
                <name>dfs.datanode.data.dir</name>
                <value>~/hadoop/data/datanode</value>
        </property>
        <property>
                <name>dfs.nodename.http.address</name>
                <value>misaka0:9870</value>
        </property>
        <property>
                <name>dfs.replication</name>
                <value>1</value>
        </property>
</configuration>
```
6. 初始化配置文件
```sh
hadoop namenode -format 
```

7. 启动Hadoop, 使用root启动时请看[root启动hadoop](#root启动hadoop)
```sh
start-dfs.sh
```

8. 关闭Hadoop可使用 `stop-dfs.sh` 或 `stop-all.sh` 命令

---
### root启动hadoop

在start-dfs.sh，stop-dfs.sh两个文件的头部填加以下参数
```sh
HDFS_DATANODE_USER=root
HADOOP_SECURE_DN_USER=hdfs
HDFS_NAMENODE_USER=root
HDFS_SECONDARYNAMENODE_USER=root
```

在start-yarn.sh，stop-yarn.sh两个文件的头部添加以下参数
```sh
YARN_RESOURCEMANAGER_USER=root
HADOOP_SECURE_DN_USER=yarn
YARN_NODEMANAGER_USER=root
```

---
### 启动hadoop可能会出现的错误
1. 如下报错
```sh
localhost: Permission denied (publickey,gssapi-keyex,gssapi-with-mic,password).
```

请注意, 要对目标机器配置ssh免密, 即使是本机也要
```sh
ssh-copy-id hostname
```

---

### FAQ

*A: SHUTDOWN_MSG: Shutting down NameNode at hostname/ip*

Q: 配置初始化完成后就会显示, 一般情况下没有错误, 在上方的INFO中找到common.Storage的输出可以看到末尾有successfully formatted表示初始化成功

*A: yum下载失败*

Q: `ping baidu.com` 和 `ping 百度的IP`, 如果域名ping不通就修改dns, 在`/etc/resolv.conf`中, 添加
```
nameserver 8.8.8.8
nameserver 8.8.4.4
```

---

