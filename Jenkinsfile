pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }

    }

    post {
        success {
            echo 'Build Successful ✅'
        }

        failure {
            echo 'Build Failed ❌'
        }
    }
}