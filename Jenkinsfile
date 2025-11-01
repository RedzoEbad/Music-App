pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/RedzoEbad/Music-App.git'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    sh 'npx cross-env NODE_ENV=test npm test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
            post {
                success {
                    echo '✅ Successfully built your frontend!'
                }
                failure {
                    echo '❌ Error occurred during the frontend build stage!'
                }
            }
        }

        stage('Dockerize Application') {
            steps {
                dir('/var/jenkins_home/workspace/newJenkingPipline') {
                    sh '''
                        docker-compose down
                        docker-compose up -d --build
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'DOCKER_HUB_CREDENTIALS', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            script {
                // Images from docker-compose.yml
                def images = [
                    'ebadkkhan2002/music-app-backend:latest',
                    'ebadkkhan2002/music-app-frontend:latest'
                ]

                // Login to Docker Hub
                sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"

                // Push each image
                for (img in images) {
                    sh "docker push ${img}"
                }

                // Logout
                sh "docker logout"
            }
        }
    }
}
        stage('Notification') {
            steps {
                echo "🎉 Build pipeline completed successfully!"
            }
        }
    }
}
