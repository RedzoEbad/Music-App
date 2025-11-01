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

        stage('Notification') {
            steps {
                echo "✅ Successfully installed dependencies for both frontend and backend!"
            }
        }
    }
}
