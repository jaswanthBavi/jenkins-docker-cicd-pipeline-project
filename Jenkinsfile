pipeline {
    agent any

    environment {
        IMAGE_NAME = "jaswanthbavi/demo-app"  
        TAG = "latest"
    }

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/jaswanthBavi/jenkins-docker-cicd-pipeline-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$TAG .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push $IMAGE_NAME:$TAG
                    '''
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                sh '''
                docker pull $IMAGE_NAME:$TAG
                docker stop app || true
                docker rm app || true
                docker run -d --name app -p 3000:3000 $IMAGE_NAME:$TAG
                '''
            }
        }
    }
}


