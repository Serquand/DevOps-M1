pipeline {
    agent any

    tools { nodejs 'Node22' }

    stages {
        stage('Build') {
            agent { label 'worker' }

            steps {
                script {
                    echo "Building stage... Nothing to do here !"
                }
            }
        }

        stage('Test') {
            agent { label 'worker' }

            steps {
                script {
                    echo 'Running tests...'
                    sh '''
                        cd app/
                        npm install
                        npm test
                    '''
                }
            }
            post {
                success {
                    script {
                        sh """
                            curl -X POST "https://discord.com/api/v9/channels/${env.DISCORD_CHANNEL_ID}/messages" \
                            -H "Authorization: Bot ${env.DISCORD_BOT_TOKEN}" \
                            -H "Content-Type: application/json" \
                            -d '{\"content\":\"Build success ! The new version of the application will go up !\"}'
                        """
                        echo 'Tests passed!'
                        currentBuild.result = "SUCCESS"
                    }
                }
                failure {
                    script {
                        sh """
                            curl -X POST "https://discord.com/api/v9/channels/${env.DISCORD_CHANNEL_ID}/messages" \
                            -H "Authorization: Bot ${env.DISCORD_BOT_TOKEN}" \
                            -H "Content-Type: application/json" \
                            -d '{\"content\":\"Build failed ! The old version of the application will stay !\"}'
                        """
                        echo 'Tests failed!'
                        currentBuild.result = "FAILURE"
                        error 'Stopping pipeline due to test failures.'
                    }
                }
            }
        }

        stage('Deploy') {
            agent { label 'worker' }
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                script {
                    echo 'Deploying...'
                    withCredentials([sshUserPrivateKey(credentialsId: 'vps_ssh_key', keyFileVariable: 'SSH_KEY')]) {
                        sh """
                            rsync -avz --exclude 'node_modules' --exclude ".git" -e "ssh -i $SSH_KEY -p ${env.VPS_PORT}" . ${env.VPS_USER}@${env.VPS_IP}:${env.VPS_FOLDER_LOCATION}
                            ssh -i $SSH_KEY -p ${env.VPS_PORT} ${env.VPS_USER}@${env.VPS_IP} "docker compose -f ${env.VPS_FOLDER_LOCATION}/deployment.yml up --build -d"
                        """
                    }
                }
            }
        }

        stage('User Acceptance Test') {
            agent { label 'worker' }

            steps {
                sh """
                    cd app/
                    npm install
                    npm run test:user_acceptance
                """
            }

            post {
                success {
                    script {
                        sh """
                            curl -X POST "https://discord.com/api/v9/channels/${env.DISCORD_CHANNEL_ID}/messages" \
                            -H "Authorization: Bot ${env.DISCORD_BOT_TOKEN}" \
                            -H "Content-Type: application/json" \
                            -d '{\"content\":\"The user acceptance test is valid ! The new application is now online !\"}'
                        """
                    }
                }
                failure {
                    script {
                        sh """
                            curl -X POST "https://discord.com/api/v9/channels/${env.DISCORD_CHANNEL_ID}/messages" \
                            -H "Authorization: Bot ${env.DISCORD_BOT_TOKEN}" \
                            -H "Content-Type: application/json" \
                            -d '{\"content\":\"The user acceptance test is not valid ! Something goes wrong when releasing the app and you need to inspect what happened !\"}'
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}