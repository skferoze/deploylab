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
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -f dockerfile -t deploylab:latest .'
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