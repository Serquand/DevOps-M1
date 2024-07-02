FROM ubuntu

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y openssh-client sshpass rsync curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY . /app

WORKDIR /app

RUN mkdir -p ~/.ssh && echo "Host *\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config

CMD sshpass -p "wPFOthRwrvTtObEy7CBkUYOzN4z9SoPgNxpOZ0JU5ltyPdv5Vk" rsync -avz --exclude "node_modules" --exclude ".git" -e "ssh -p 64923" . debian@51.75.28.85:apps/todo_m1_devops && \
    sshpass -p "wPFOthRwrvTtObEy7CBkUYOzN4z9SoPgNxpOZ0JU5ltyPdv5Vk" ssh -p 64923 debian@51.75.28.85 "MONGODB_URL=mongodb+srv://Serkan:J8zn3kGeLadw7fV7@cluster0.6smcpie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 docker compose -f apps/todo_m1_devops/deployment.yml up --build -d"