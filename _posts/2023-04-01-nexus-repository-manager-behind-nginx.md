---
title: Running Nexus Repository Manager Behind an Nginx Reverse Proxy
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
description: Running Nexus Repository Manager Behind an Nginx Reverse Proxy
author: Ali Riza Esenli
externalLink: false
---

![]({{ 'assets/nexus-nginx-banner.png' | relative_url }})


In this blog post, I'll guide you through the process, how to run the Nexus Repository Manager on a Server. For security purposes, I'll host Nexus behind an Nginx Reverse Proxy.

## Installing Nexus Repository Manager
You could download the latest version of Nexus Repository Manager from the official website. Instead of doing that manually, we will use the official <a href="https://hub.docker.com/r/sonatype/nexus3/" target="_blank">Nexus3 docker image</a>.

## Setting up Hosting machine
In order to run the Application on my Subdomain I'll host it on a Hetzner CX31 shared Server with 8GB RAM and 2-Core VCPU. According to <a href="https://help.sonatype.com/repomanager2/system-requirements/" target="_blank">System Requirements</a> its recommended to have at least 4GB of physical RAM. 

For production you'll probably need to increase the physical RAM and allocated Application space depending on the team size and amount of hosted packages.

## Configuring Nginx Reverse Proxy with SSL Certificate

SSH into your machine and use Certbot to create an SSL certificate for your domain/subdomain. First, install Certbot by running the following command:
	
```
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
```

Then, run the following command to obtain a new SSL certificate for your domain/subdomain:
```
sudo certbot --nginx -d {your.subdomain.com}
```

The SSL certificate is stored in the directory ```/etc/letsencrypt/live/{your.domain.com}/```. Within this directory, you will find several files including:

* cert.pem --> the SSL certificate for your domain<br >
* chain.pem --> the intermediate certificate provided by the Certificate Authority (CA)<br >
* fullchain.pem --> the SSL certificate and intermediate certificate concatenated together<br >
* privkey.pem --> the private key for your SSL certificate<br >

Once the SSL certificate is installed and the Nginx configuration is updated, your domain/subdomain should be accessible over HTTPS with a valid SSL certificate.

Next, we need to configure Nginx as a reverse proxy for Nexus Repository Manager. To do this, we need to create an Nginx configuration file.

We are listening to Port 80 HTTP and 443 HTTPS. The incoming requests will automatically be forwarded to HTTPS. Don't forget to point to your SSL certificates inside your docker container.

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

## Setting up Docker Compose

This docker compose file defines a multi-container application that runs a Nexus Repository Manager instance and an Nginx web server instance, and allows them to communicate with each other. Under volumes you could map your nginx.config file and your SSL certificate to your container.

| *docker-compose.yaml*

```yaml
version: '1.0'

services:
  nexus:
    image: sonatype/nexus3:3.50.0
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

## Running the Application

To run the application, use the command ```docker-compose up -d``` in the terminal, which will pull up the server and create the necessary containers. Verify that the containers are running correctly by running ```docker ps``` in the terminal, which should display the container IDs and status.


| *root@docker-ce-ubuntu-8gb-nbg1-1:~# docker ps*

```config
CONTAINER ID   IMAGE              COMMAND                  CREATED      STATUS      PORTS                                                                      NAMES
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
9e5132002225   nginx:latest       "/docker-entrypoint.…"   5 days ago   Up 5 days   0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp   nginx
6786bdca220b   nexus3:3.49.0      "/opt/sonatype/nexus…"   5 days ago   Up 5 days   0.0.0.0:8081->8081/tcp, :::8081->8081/tcp                                  nexus

```
Finally, visit your domain or subdomain and start using Nexus as a private package manager! It supports various package formats for software artifacts, proxying and caching remote repositories.

Following formats are currently supported:

* Java packages: Maven, Ivy, and Gradle<br>
* .NET packages: NuGet, .NET Core, and Chocolatey<br>
* JavaScript packages: npm, Bower, and Yarn<br>
* Docker images: Docker (hosted Docker registries)<br>
* Python packages: PyPI<br>
* Ruby packages: RubyGems<br><br>

![]({{ 'assets/nexus-repository-manager.png' | relative_url }})
