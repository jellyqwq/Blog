---
title: Docker install centos7
icon: page
order: 1
author: Jelly
date: 2022-09-15
category:
  - Docker
tag:
  - Docker
  - CentOS7
sticky: false
star: false
---

因为VMware装在电脑上会影响虚拟网卡的创建, 于是我尝试使用docker来代替VMware来完成课堂任务

<!-- more -->

拉取一个[镜像](ttps://hub.docker.com)到本地

```sh
docker pull centos:centos7

# docker pull image_name:tag
# 或者使用 docker pull image_name 来获取最新版本
```

### [user defined bridge networks](https://docs.docker.com/network/network-tutorial-standalone/#use-user-defined-bridge-networks)
```sh
# 指定一个网段, 用于设置容器的静态ip
docker network create --subnet=192.168.60.0/8 --gateway 192.168.60.0 misaka

# 查看docker网络列表
docker network ls

# 删除指定的网络
docker network rm misaka
```

### DNS
找到宿主机中 /etc/docker/daemon.json(Linux) 或 C:\Users\用户名\\.docker\daemon.json(Windows) 添加dns配置, 配置完后一定要对docker进行重启, 不然新创建的容器读取不到更新的配置. 我在window下用vscode对daemon.json编辑后发现新创建的容器不受配置文件的影响, 后来我在docker内置的daemon.json配置的页面里有一个apply&restart的按钮, 我才意识到改完配置后要重启docker

**注意**: 这个daemon.json设置的dns不会显示在容器的 /etc/resolv.conf 文件中
```
常用的DNS
119.29.29.29 腾讯
223.5.5.5 阿里
114.114.114.114

1.1.1.1 cloudflare
8.8.8.8 谷歌
9.9.9.9 IBM
208.67.222.222 思科

# 配置 - 添加dns
{
    "dns": ["119.29.29.29", "223.5.5.5", "114.114.114.114", "1.1.1.1", "8.8.8.8"]
}
```

### 运行容器

```sh
docker run -itd -v /d/Desktop/docker_src/package:/root/package --privileged=true --name misaka0 --hostname misaka0 --net misaka --ip 192.168.60.10 --add-host misaka1:192.168.60.11 centos:centos7 /usr/sbin/init

# [-it] 以交互模式运行启动容器
# [-v 宿主机目录:容器目录] 挂载宿主机目录到容器目录, 
# [-d] 后台运行容器
# [-p 宿主机端口:容器端口]  端口映射
# [--privileged=true] 为了使用systemd,需要开启并从/usr/sbin/init启动容器, 让0号进程为init, 通常情况下不使用privileged和/usr/sbin/init, 官方也不推荐使用privileged
# [--hostname hostname] 设定hostname;
# [--net] 指定网络模式 (默认bridge)
# [--ip] 指定IP
# [--add-host] 指定往/etc/hosts添加的host
# [--dns nameserver] 指定容器dns
```

### 其他命令
宿主机
```sh
# 进入容器
docker exec -it [container_name | container_id] /bin/bash

# 停止容器
docker container stop container1 container2 ...

# 删除容器
docker container rm container1 container2 ...

# 重启容器
docker container restart container1 container2 ...

# 启动容器
docker container start container1 container2 ...
```

容器
```sh
# 查看容器dns
cat etc/resolv.conf

# 查看网络上的设备对应的ip
cat /etc/hosts
```

---
### 目标
1. 创建misaka网络
2. 将misaka0, misaka1连接misaka网络
3. 成功ping baidu.com
4. 安装java和zookeeper

### 配置
|container name|ip|hostname|
|--|--|--|
|misaka0|192.168.60.10|misaka0|
|misaka1|192.168.60.11|misaka1|
|misaka2|192.168.60.12|misaka2|

---

### require package
```sh
yum -y update
yum install -y net-tools
```

---

### ssh服务
安装ssh服务
```sh
yum -y install openssh-server
```

修改/etc/ssh/sshd_config文件
```sh
sed -i "s/^#Port 22/Port 22/g" /etc/ssh/sshd_config
sed -i "s/^#ListenAddress 0.0.0.0/ListenAddress 0.0.0.0/g" /etc/ssh/sshd_config
sed -i "s/^#ListenAddress ::/ListenAddress ::/g" /etc/ssh/sshd_config
```

端口放行和ssh服务的启动
```sh
yum -y install firewalld
firewall-cmd --permanent --zone=public --add-port=22/tcp
systemctl restart firewalld

systemctl enable sshd.service
systemctl restart sshd.service
```

生成密钥
```sh
expect -c "
    spawn "ssh-keygen -t rsa";
    expect {
            \"Are you sure you want to continue connecting (yes/no)?\" {send \"yes\r\"; exp_continue}
            }
        "
expect "Enter file in which to save the key (/root/.ssh/id_rsa):" {send "\n"}
expect "Enter passphrase (empty for no passphrase):" {send "\n"}
expect "Enter same passphrase again:" {send "\n"}
```

传输密钥
```sh
for ip in misaka0 misaka1 misaka2
do
    if [ ${ip} != $HOSTNAME ];then
        ssh-copy-id ${ip}
        expect "(yes/no)?"
        send "yes\n"
        expect "password:"
        send "123456\n"
    fi
done
```

修改密码
```sh
echo "123456" | passwd --stdin root
```

