pipeline{
    agent any
     tools {
          nodejs 'NodeJS 20.' // <-- match the "Name" field exactly
    }
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