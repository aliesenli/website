---
title: A Guide to Running Nexus Repository Behind an Nginx Reverse Proxy
tag:
- DevOps
- Nexus
- Nginx
- Docker
- NPM
- Hetzner
- Private Registry
layout: post
category: blog
headerImage: true
hidden: false
description: A Guide to Running Nexus Repository Manager Behind Nginx
author: Ali Riza Esenli
externalLink: false
---

![]({{ 'assets/nexus-nginx-banner.png' | relative_url }})


In this blog post, I'll guide you through the process, how to run the Nexus Repository Manager on a Server. For security purposes, I'll host Nexus behind a Nginx Reverse Proxy.

## Installing Nexus Repository Manager
You could download the latest version of Nexus Repository Manager from the official website. Instead of doing that manually from their website, we will use the official <a href="https://hub.docker.com/r/sonatype/nexus3/" target="_blank">Nexus3 docker image</a>.

## Setup Hosting machine
In order to run the Application on my Subdomain I'll host it on a Hetzner CX31 shared Server with 8GB RAM and 2-Core VCPU. According to <a href="https://help.sonatype.com/repomanager2/system-requirements/" target="_blank">System Requirements</a> its recommended to have at least 4GB of physical RAM. 

For production you'll probably need to increase the physical RAM and allocated Application space depending on the team size and amount of hosted packages.
## Configuring Nginx Reverse Proxy with SSL Certificate

Next, we need to configure Nginx as a reverse proxy for Nexus Repository Manager. To do this, we need to create an Nginx configuration file.

We are listening to Port 80 HTTP and 443 HTTPS. The incoming requests will automatically be forwarded to HTTPS. 

Here's an example config file:

| *nginx.conf*

```config
http {

  server {
    listen 80;
    server_name nexus.aliesenli.com;
    return 301 https://nexus.aliesenli.com$request_uri;
  }

  server {
    listen 443 ssl;
    server_name nexus.aliesenli.com;

    ssl_certificate /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key/etc/nginx/certs/privkey.pem;

    access_log /var/log/nginx/data-access.log combined;

    location / {
      proxy_pass http: //nexus:8081/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $remote_addr;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_redirect http://nexus:8081/ $scheme://$http_host/;
      proxy_http_version 1.1;
      proxy_send_timeout 150;
      proxy_read_timeout 320;
    }
  }
}
```

Verify Nginx syntax by using the command below:

```
nginx -t
```

You are good to go, if the output is similar to this:
```
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

| *docker-compose.yaml*

```yaml
version: '1.0'

services:
  nexus:
    image: sonatype/nexus3:3.49.0
    container_name: nexus
    restart: always
    ports:
      - 8081:8081
    volumes:
      - ./nexus-data:/nexus-data
  nginx:
    image: nginx:latest
    container_name: nginx
    restart: always
    ports:
      - 80:80
      - 443:443
    volumes:
      - ./config/nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs
    depends_on:
      - nexus
```

Now its time to pull up the server. 
```
docker-compose up -d
```

| *root@docker-ce-ubuntu-8gb-nbg1-1:~# docker ps*

```config
CONTAINER ID   IMAGE              COMMAND                  CREATED      STATUS      PORTS                                                                      NAMES
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
9e5132002225   nginx:latest       "/docker-entrypoint.…"   5 days ago   Up 5 days   0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp   nginx
6786bdca220b   nexus3:3.49.0      "/opt/sonatype/nexus…"   5 days ago   Up 5 days   0.0.0.0:8081->8081/tcp, :::8081->8081/tcp                                  nexus

```
