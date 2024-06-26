pipeline {
    agent any

    stages {
        stage('Build') {
            // agent {
                // label 'TestingNode'
            // }
            steps {
                script {
                    echo "Building stage... Nothing to do here !"
                }
            }
        }

        stage('Test') {
            // agent {
                // label 'TestingNode'
            // }
            steps {
                script {
                    echo 'Running tests...'
                }
            }
            post {
                success {
                    script {
                        echo 'Tests passed!'
                        currentBuild.result = true
                    }
                }
                failure {
                    script {
                        echo 'Tests failed!'
                        currentBuild.result = false
                        error 'Stopping pipeline due to test failures.'
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                expression {
                    currentBuild.result
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