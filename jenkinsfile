pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'bavijaswanth/ci-cd-app'
    TAG = "${v1.0}"
  }

  stages {
    stage('Clone Repo') {
      steps {
        git 'https://github.com/jaswanthBavi/jenkins-docker-cicd-pipeline-project.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'pip install -r app/requirements.txt'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'pytest app/test_app.py'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${DOCKER_IMAGE}:${TAG}")
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'bavijaswanth', passwordVariable: 'Jaswanth@0227')]) {
          sh """
            echo $PASSWORD | docker login -u $USERNAME --password-stdin
            docker push ${DOCKER_IMAGE}:${TAG}
          """
        }
      }
    }

    stage('Deploy Locally') {
      steps {
        sh 'docker-compose up -d'
      }
    }
  }

  post {
    always {
      echo "Cleaning up..."
      sh 'docker system prune -f'
    }
  }
}

