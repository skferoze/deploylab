pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '766964472492'
        ECR_REPOSITORY = 'deploylab'
        IMAGE_NAME = 'deploylab'
        ECR_IMAGE = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}"
        INSTANCE_ID = 'i-0fcb3f8fbb0ee8c61'
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
                sh 'docker build -f dockerfile -t ${IMAGE_NAME}:latest .'
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                aws ecr get-login-password --region $AWS_REGION | \
                docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                '''
            }
        }

        stage('Tag Image') {
            steps {
                sh '''
                docker tag ${IMAGE_NAME}:latest ${ECR_IMAGE}:latest
                '''
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                docker push ${ECR_IMAGE}:latest
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                aws ssm send-command \
                  --instance-ids $INSTANCE_ID \
                  --document-name "AWS-RunShellScript" \
                  --comment "Deploy latest DeployLab image" \
                  --parameters 'commands=[
                    "aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 766964472492.dkr.ecr.ap-south-1.amazonaws.com",
                    "docker pull 766964472492.dkr.ecr.ap-south-1.amazonaws.com/deploylab:latest",
                    "docker stop deploylab || true",
                    "docker rm deploylab || true",
                    "docker run -d --name deploylab -p 8080:8080 766964472492.dkr.ecr.ap-south-1.amazonaws.com/deploylab:latest"
                  ]'
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 CI/CD Pipeline Executed Successfully!'
        }

        failure {
            echo '❌ CI/CD Pipeline Failed!'
        }

        always {
            sh 'docker image prune -f || true'
        }
    }
}