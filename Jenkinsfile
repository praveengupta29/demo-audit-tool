pipeline{
    agent any
    
    stages{
        stage('Installing NPM dependencies'){
           
            steps {
                dir("microservices/questionnaire/") {
                    sh '/usr/local/bin/npm install'
                }
            }
        }
        stage('Run Unit Test'){
        
            steps {
                dir("microservices/questionnaire/") {
                    sh '/usr/local/bin/npm run test'
                }
            }
        }
    }
}
