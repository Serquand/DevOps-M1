FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y \
       openjdk-11-jdk \
       wget \
       gnupg2 \
       apt-transport-https \
       ca-certificates \
       curl \
       git \
       software-properties-common \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/share/jenkins \
    && wget -O /usr/share/jenkins/jenkins.war https://get.jenkins.io/war-stable/latest/jenkins.war

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

RUN apt-get install -y nodejs build-essential

EXPOSE 8080

CMD ["java", "-jar", "/usr/share/jenkins/jenkins.war"]