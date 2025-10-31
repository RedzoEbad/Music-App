pipeline {
    agent {
        docker {
            image 'node:20-bullseye'
            args '-u root:root'
        }
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/RedzoEbad/Music-App.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Version') {
            steps {
                sh 'node -v'
            }
        }
    }
}
