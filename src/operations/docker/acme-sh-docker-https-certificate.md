# 使用 acme.sh + Docker 自动申请和部署 Let's Encrypt HTTPS 证书

# 1. 环境说明

使用 `acme.sh` + Docker + DNS API 自动申请 Let's Encrypt SSL 证书。

```markdown
流程：

域名
↓
DNS 服务商 API 验证
↓
acme.sh 签发证书
↓
部署证书到 Nginx
↓
Nginx reload 生效
```

---

# 2. DNS API 配置

根据 DNS 服务商设置 API Key。

例如：

## DNSPod

```bash
export DP_Id="xxxx"
export DP_Key="xxxxxxxxxxxxxxxxxx"
```

## 阿里云 DNS

```bash
export Ali_Key="xxxx"
export Ali_Secret="xxxxxxxxxxxxxxxxxx"
```

> 注意：
>
> * API Key 需要具备 DNS 修改权限
> * 用于 DNS-01 验证
> * 可以签发泛域名证书，例如 `*.example.com`

---

# 3. 设置默认 CA

acme.sh 默认 CA 可以切换为 Let's Encrypt。

执行：

```bash
docker exec acme.sh acme.sh \
--set-default-ca \
--server letsencrypt
```

检查：

```bash
docker exec acme.sh acme.sh --info
```

---

# 4. 签发证书

## 4.1 DNSPod 示例

域名：

```
example.com
```

子域名：

```
www.example.com
```

执行：

```bash
docker exec acme.sh \
acme.sh --issue \
-d www.example.com \
--dns dns_dp
```

---

## 4.2 多域名证书

例如：

```bash
docker exec acme.sh \
acme.sh --issue \
-d www.example.com \
-d *.www.example.com \
--dns dns_dp
```

支持：

* 单域名

```
api.example.com
```

* 泛域名

```
*.example.com
```

---

## 4.3 阿里云 DNS 示例

```bash
docker exec acme.sh \
acme.sh --issue \
--dns dns_ali \
-d www.example.com \
-d .example.com
```

---

# 5. 部署证书到 Docker Nginx

## 证书目录规划

例如：

```
/etc/nginx/conf.d/ssl/

├── www.example.com
│   ├── key.pem
│   ├── cert.pem
│   ├── ca.pem
│   └── full.pem
│
├── api.example.com
│
└── drive.example.com
```

---

# 6. Deploy Hook 自动更新 Nginx

模板：

```bash
docker exec \
-e DEPLOY_DOCKER_CONTAINER_LABEL=sh.acme.autoload.service=nginx \
-e DEPLOY_DOCKER_CONTAINER_KEY_FILE="/etc/nginx/conf.d/ssl/www.example.com/key.pem" \
-e DEPLOY_DOCKER_CONTAINER_CERT_FILE="/etc/nginx/conf.d/ssl/www.example.com/cert.pem" \
-e DEPLOY_DOCKER_CONTAINER_CA_FILE="/etc/nginx/conf.d/ssl/www.example.com/ca.pem" \
-e DEPLOY_DOCKER_CONTAINER_FULLCHAIN_FILE="/etc/nginx/conf.d/ssl/www.example.com/full.pem" \
-e DEPLOY_DOCKER_CONTAINER_RELOAD_CMD="service nginx force-reload" \
acme.sh \
--deploy \
-d www.example.com \
--ecc \
--deploy-hook docker
```

---

# 7. 查看证书

查看所有证书：

```bash
docker exec acme.sh acme.sh --list
```

查看指定域名：

```bash
docker exec acme.sh \
acme.sh --info \
-d www.example.com
```

---

# 8. 手动续期

acme.sh 默认会自动续期。

测试：

```bash
docker exec acme.sh \
acme.sh --renew \
-d www.example.com \
--force
```

---

# 9. 常用排错命令

查看 acme.sh 日志：

```bash
docker logs acme.sh
```

进入容器：

```bash
docker exec -it acme.sh sh
```

查看 Nginx：

```bash
docker logs nginx
```

测试 Nginx 配置：

```bash
nginx -t
```

重载：

```bash
nginx -s reload
```

# 10. docker-compose.yml 参考

```yaml
services:
  nginx:
    image: nginx:latest
    container_name: nginx
    restart: always
    networks: 
      - misaka
    links:
      - wordpress:wordpress
      - ariang:ariang
      - aria2:aira2
      - alist:alist
    ports:
      - 80:80
      - 443:443
    volumes:
      - ~/docker/data/var/www:/var/www
      - ~/docker/nginx/conf.d:/etc/nginx/conf.d
      - ~/docker/nginx/conf.d/ssl:/etc/nginx/conf.d/ssl
    # 这里就是给上面 deploy hook 用的
    labels:
      - sh.acme.autoload.service=nginx

  acme.sh:
    depends_on:
      - nginx
    image: neilpang/acme.sh
    container_name: acme.sh
    restart: always
    # 防止它跑完入口命令就关闭导致持续重启
    networks: 
      - misaka
    environment:
      - Email=xxxxxxxxx@qq.com
      - DP_Id=xxxxxx
      - DP_Key=xxxxxxxxxxxxxxxxxxxxxxxx
    volumes:
      - ~/docker/acme:/acme.sh
      - /var/run/docker.sock:/var/run/docker.sock
    command: >
      sh -c "/entry.sh daemon &&
              /acme.sh --set-default-ca --server letsencrypt --register-account $(Email)"
```
