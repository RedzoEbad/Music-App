pipeline {
    agent any
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/RedzoEbad/Music-App.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        stage('Version') {
            steps {
                sh 'node -v'
            }
        }
    }
}
