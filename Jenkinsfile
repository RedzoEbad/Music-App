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
        script {
            // Docker Hub credentials
            def dockerHubUser = 'ebadkkhan2002'
            def dockerHubPassword = 'noadiza2002'
            def imageName = 'ebadkkhan2002/music-app'
            def imageTag = 'latest'

            // Login to Docker Hub
            sh "echo ${dockerHubPassword} | docker login -u ${dockerHubUser} --password-stdin"

            // Build Docker image (optional if already built by docker-compose)
            sh "docker build -t ${imageName}:${imageTag} ."

            // Push to Docker Hub
            sh "docker push ${imageName}:${imageTag}"

            // Logout
            sh "docker logout"
        }
    }

        stage('Notification') {
            steps {
                echo "🎉 Build pipeline completed successfully!"
            }
        }
    }
}
