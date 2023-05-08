---
title: Install Hive
icon: page
author: Jelly
date: 2023-05-08
category:
  - Hadoop
tag:
  - Hadoop
  - Hive
sticky: false
star: false
---

## 前置

Hive 的使用需要依赖MySQL, 这里使用了mariadb来作为MySQL, 它是兼容MySQL的.

### 镜像拉取

```sh
docker pull mariadb
```

### 运行实例
|参数|值|说明|
|--|--|--|
|–i||创建交互式会话|
|-t||创建伪终端|
|-d||后台启动|
|--privileged=true||使用特权模式启动, 以允许容器对宿主机的写入
|--name|mariadb|容器名字|
|--network|misaka|将数据库接入misaka网络|
|--ip|192.168.60.100|容器IP|
|-p|3306:3306|端口映射|
|-v|/d/Desktop/BD/resolv.conf:/etc/resolv.conf|挂载目录使dns持久化|
|-e|MARIADB_ROOT_PASSWORD=123456|设置数据库root用户密码|
|-e|MARIADB_DATABASE=hive|创建名为hive的数据库|
|-e|MARIADB_USER=hive|创建数据库用户hive|
|-e|MARIADB_PASSWORD=123456|指定123456为上述用户的密码
<!-- |-v|/d/Desktop/BD/mariadb/data:/var/lib/mysql|挂载数据目录| -->

更多环境变量及参数移步至[官方文档](https://docs.docker.com/engine/reference/commandline/create/#options)
```sh
docker run -i -t -d --privileged=true --name mariadb --network misaka --ip 192.168.60.100 -p 3306:3306 -v /d/Desktop/BD/resolv.conf:/etc/resolv.conf -e "MARIADB_ROOT_PASSWORD=123456" -e "MARIADB_DATABASE=hive" -e "MARIADB_USER=hive" -e "MARIADB_PASSWORD=123456" mariadb
```

用 `-v /d/Desktop/BD/mariadb/data:/var/lib/mysql` 来本地挂载数据卷会导致 `schemea` 出问题, 不建议使用这么用, 默认会使用 `docker` 的 `volumes` 来挂载 `/var/lib/mysql`

### 给hive用户数据库权限
```sql
Grant all privileges on hive.* to 'hive'@'192.168.60.100' identified by '123456'; 
```

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2023/05/84cbd72b-1257-4867-85c8-a5be1bc4d26b.png)

## Hive 安装
从[官网](https://hive.apache.org/general/downloads/)下载, 可以查看那个是支持的

从后面回来了, 由于我hadoop是3.2.4的, 所以我用[hive-3.1.3](https://dlcdn.apache.org/hive/hive-3.1.3/)

### 下载hive

```sh
wget https://dlcdn.apache.org/hive/hive-3.1.3/apache-hive-3.1.3-bin.tar.gz
```

### 解压hive
> -C path 解压到指定目录 

```sh
tar -zxf apache-hive-3.1.3-bin.tar.gz -C /usr/local/
```
### 重命名hive目录
解压出来的hive一般是这样的: `apache-hive-3.1.3-bin`, 为了方便配置可以重命名下

```sh
mv /usr/local/apache-hive-3.1.3-bin /usr/local/hive-3.1.3
```

### 设置Hive属组

```sh
chown -R root /usr/local/hive-3.1.3
```

### 添加hive环境变量
```sh
echo 'export HIVE_HOME=/usr/local/hive-3.1.3' >> /etc/profile.d/hadoop.sh
echo 'export PATH=$PATH:$HIVE_HOME/bin' >> /etc/profile.d/hadoop.sh
```

### 刷新环境变量
```sh
source /etc/profile
```

## MySQL驱动包安装

`mysql-connector-java-5.1.48.tar.gz`包的获取就不多说了, 同理hive

### 解压
将该驱动包 `mysql-connector-java-5.1.48.tar.gz` 解压, 将其中的 `mysql-connector-java-5.1.48-bin.jar` 到 `$HIVE_HOME/lib` 中去

```sh
tar -zxf mysql-connector-java-5.1.48.tar.gz
mv mysql-connector-java-5.1.48/mysql-connector-java-5.1.48-bin.jar $HIVE_HOME/lib
# 删除解压出来的目录
rm -rf mysql-connector-java-5.1.48
```

### 版本选择

可以在[mvnrepository](https://mvnrepository.com/artifact/mysql/mysql-connector-java)找到所有jdbc的下载

建议使用适配版本, 最新版未必适合

我在 `hive-3.1.3` 使用 `mysql-connector-java-8.*.*` 版本时会出现版本不兼容的情况, 最后还是用回上面的 `mysql-connector-java-5.1.48` 版本

### 配置文件
配置文件在 `$HIVE_HOME/conf` 下

进入该目录

```sh
cd $HIVE_HOME/conf
```

#### hive-env.sh

复制 `hive-env.sh.template` 为 `hive-env.sh`

```sh
cp hive-env.sh.template hive-env.sh
```

对 `hive-env.sh` 配置, 修改其 `HADOOP_HOME`, `HIVE_CONF_DIR`和 `HIVE_AUX_JARS_PATH` 三个配置项, 并将其注释去掉

`HADOOP_HOME` 是Hadoop的Home目录

`HIVE_CONF_DIR` 是Hive的配置目录, 默认为 `$HIVE_HOME/conf`

`HIVE_AUX_JARS_PATH` 是Hive存放jar包的路径 默认为 `$HIVE_HOME/lib`

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2023/05/548ca484-3c14-4690-9c8c-c6e497130f26.png)

#### hive-default.xml

从模板中复制一份, 该文件为Hive默认加载文件可不用修改

```sh
cp hive-default.xml.template hive-default.xml
```

#### hive-site.xml

在 `$HIVE_HOME/conf` 中新建文件 `hive-site.xml`, 并向其中添加如下内容

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
    <property>
      <name>javax.jdo.option.ConnectionURL</name>
      <value>jdbc:mysql://192.168.60.100:3306/hive?createDatabaseIfNotExist=true&amp;useSSL=false</value>
    </property>
    <property>
      <name>javax.jdo.option.ConnectionDriverName</name>
      <value>com.mysql.jdbc.Driver</value>
    </property>
    <property>
      <name>javax.jdo.option.ConnectionUserName</name>
      <value>hive</value>
    </property>
    <property>
      <name>javax.jdo.option.ConnectionPassword</name>
      <value>123456</value>
    </property>
</configuration>
```

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2023/05/331d5d7c-1dbc-4333-ad6d-e9844b59de16.png)

## Hive 运行

### 初始化hive
这是将hive的数据库操作类型设置为mysql, `--verbose` 参数可以获得更加完整的日志信息, 方便追踪错误

```sh
schematool -initSchema --verbose -dbType mysql
```

![](https://cdn.jsdelivr.net/gh/jellyqwq/PictureBed@main/2023/05/9e0077bd-c3e4-4b95-8bab-538e484fcfd6.png)




