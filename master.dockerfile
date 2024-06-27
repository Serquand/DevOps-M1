FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y openjdk-11-jdk wget git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/share/jenkins

RUN wget -O /usr/share/jenkins/jenkins.war https://get.jenkins.io/war-stable/latest/jenkins.war

EXPOSE 8080

CMD ["java", "-jar", "/usr/share/jenkins/jenkins.war"]