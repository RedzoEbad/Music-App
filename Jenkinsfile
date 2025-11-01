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
                    sh 'npm install'  // use 'bat' if running on Windows
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'  // use 'bat' if on Windows
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    // 🧪 Run tests with test environment
                    sh 'cross-env NODE_ENV=test npm test'
                }
            }
            post {
                success {
                    echo "✅ Backend tests passed successfully!"
                }
                failure {
                    echo "❌ Some backend tests failed. Check the logs for details."
                }
            }
        }

        stage('Notification') {
            steps {
                echo "🎉 Successfully installed dependencies and ran backend tests!"
            }
        }
    }
}
