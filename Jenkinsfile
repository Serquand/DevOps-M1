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

        // stage('Test') {
        //     agent {
        //         label 'TestingNode'
        //     }
        //     steps {
        //         script {
        //             echo 'Running tests...'
        //         }
        //     }
        //     post {
        //         success {
        //             script {
        //                 echo 'Tests passed!'
        //                 currentBuild.result = 'SUCCESS'
        //             }
        //         }
        //         failure {
        //             script {
        //                 echo 'Tests failed!'
        //                 currentBuild.result = 'FAILURE'
        //                 error 'Stopping pipeline due to test failures.'
        //             }
        //         }
        //     }
        // }

        stage('Deploy') {
            when {
                expression {
                    false
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