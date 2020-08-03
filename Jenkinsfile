pipeline{
    agent any
    
    stages{
        stage('Installing NPM dependencies'){
           
            steps {
                dir("microservices/questionnaire/") {
                    sh 'ls /usr/local/bin/'
                    sh 'node -v'
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
