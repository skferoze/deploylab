pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REPO = '766964472492.dkr.ecr.ap-south-1.amazonaws.com/deploylab'
    }

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

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS --password-stdin $ECR_REPO
                '''
            }
        }

        stage('Tag Image') {
            steps {
                sh '''
                docker tag deploylab:latest $ECR_REPO:latest
                '''
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                docker push $ECR_REPO:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline Completed Successfully ✅'
        }

        failure {
            echo 'Pipeline Failed ❌'
        }
    }
}