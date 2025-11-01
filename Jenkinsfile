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
                    // Build the production-ready frontend bundle
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

        stage('Notification') {
            steps {
                echo "🎉 Build pipeline completed successfully!"
            }
        }
    }
}
