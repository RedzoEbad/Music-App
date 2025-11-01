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
        stage('Install Dependencies') {
            steps {
                dir('backend'){
                sh 'npm install'
                }
            }
        }
        stage('Notification'){
            steps{
                echo "you have succesfully instlaled both packe .json "
            }
        }
    }
}
