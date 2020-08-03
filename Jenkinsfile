pipeline{
     agent any
    
    stages{
        stage('Installing NPM dependencies'){
           
            steps {
                sh '/usr/local/bin/npm install'
            }
        }
        stage('Run Unit Test'){
        
            steps {
                sh '/usr/local/bin/npm run test'
            }
        }
    }
}
