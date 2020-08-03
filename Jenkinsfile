pipeline{
    agent any
    
    stages{
        stage('Installing NPM dependencies'){
           
            steps {
                dir("microservices/questionnaire/") {
                    sh 'export PATH="$PATH:/usr/local/bin/"'
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
