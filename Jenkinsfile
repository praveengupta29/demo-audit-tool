pipeline {
    stages{
        stage('Installing NPM dependencies'){
           
            steps {
                dir("microservices/questionnaire/") {
                    sh 'npm install'
                }
            }
        }
        stage('Run Unit Test'){
        
            steps {
                dir("microservices/questionnaire/") {
                    sh 'npm run test'
                }
            }
        }
    }
}
