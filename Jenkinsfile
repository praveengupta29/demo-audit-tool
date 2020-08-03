pipeline{
   agent {
        docker {
            image 'node:current-slim'
            args '-v /tmp:/tmp'
        }
   }
    
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
