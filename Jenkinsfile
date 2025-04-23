pipeline {
    agent any

    environment {
        IMAGE_NAME = "bavijaswanth/demo-app"
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
                sh 'docker build -t bavijaswanth/demo-app:latest .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: '5c3c58fd-724f-4b8b-9602-2b8e824b4232', usernameVariable: 'bavijaswanth', passwordVariable: 'Jaswanth@0227')]) {
                    sh '''
                    echo "$bavijaswanth" | docker login -u "$bavijaswanth" --password-stdin
                    docker push bavijaswanth/demo-app:latest
                    '''
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                sh '''
                docker pull bavijaswanth/demo-app:latest
                docker stop demo-app || true && docker rm demo-app || true
                docker run -d --name demo-app -p 3000:3000 bavijaswanth/demo-app:latest

                '''
            }
        }
    }
}

