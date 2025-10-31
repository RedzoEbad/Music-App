pipeline{
    agent any
    stages{
        stage('Checkout Code'){
            steps{
                git branch : 'main', url: 'https://github.com/RedzoEbad/Music-App.git'
            }
        }
        stage('Install Dependencies'){
            steps {
                sh 'npm install'
            }
        }
    }
}