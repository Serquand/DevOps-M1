FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y openjdk-11-jdk wget gnupg2 apt-transport-https ca-certificates curl software-properties-common && \
    apt-get clean

RUN apt-get update && \
    apt-get install -y docker.io && \
    apt-get clean

RUN curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose && \
    ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

RUN mkdir -p /home/jenkins/agent

RUN useradd -m -d /home/jenkins jenkins

USER jenkins

WORKDIR /home/jenkins/agent

COPY jenkins-agent.sh /usr/local/bin/jenkins-agent.sh
RUN chmod +x /usr/local/bin/jenkins-agent.sh

ENTRYPOINT ["/usr/local/bin/jenkins-agent.sh"]
