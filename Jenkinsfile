pipeline{
    agent any
     tools {
          nodejs 'node' // <-- match the "Name" field exactly
    }
    stages{
        stage('Checkout Code'){
            steps{
                git branch : 'main', url: 'https://github.com/RedzoEbad/Music-App.git'
            }
        }
        stage('cook'){
        steps{
            echo "cook food"
        }}
//         stage('Install Dependencies'){
//             steps {
//                 sh 'npm install'
//             }
//         }
//         stage('Verify Node') {
//     steps {
//         sh 'node -v'
//         sh 'npm -v'
//     }
// }
    }
}