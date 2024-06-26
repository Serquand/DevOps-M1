pipeline {
    agent { label: 'testing' }

    stages {
        stage('Build') {
            steps {
                script {
                    echo "Building stage... Nothing to do here !"
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    echo 'Running tests...'
                    error 'Simulated test failure!'
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
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                script {
                    echo 'Deploying...'
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