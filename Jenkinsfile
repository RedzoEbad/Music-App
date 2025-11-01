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
                    bat 'npm install'
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    bat 'npx cross-env NODE_ENV=test npm test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
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
                // Run docker-compose on Windows host
                bat 'docker-compose -f D:\\OnlyValidProjectsForNodeJs\\Music-App\\docker-compose.yml up -d --build'
            }
        }

        stage('Notification') {
            steps {
                echo "🎉 Build pipeline completed successfully!"
            }
        }
    }
}
