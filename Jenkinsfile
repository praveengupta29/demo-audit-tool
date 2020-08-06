podTemplate(
    label: 'cd-jenkins-jenkins-slave', 
    containers: [ 
        containerTemplate(
            name: 'docker', 
            image: 'docker:18.02',
            ttyEnabled: true,
            command: 'cat'
        ),
    ],
    volumes: [
        hostPathVolume(
            hostPath: '/var/run/docker.sock',
            mountPath: '/var/run/docker.sock'
        )
    ]
) {
    node('cd-jenkins-jenkins-slave') {
        def commitId
        stage ('Checkout') {
            checkout scm
            commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
        }
        stage ('Npm dependencies') {
            steps {
                dir("microservices/questionnaire/") {
                    sh 'npm install'
                }	            
            }
        }
        def repository
        def projectId = 'basic-k8s'
    
        stage ('Build') {
            container ('docker') {
                sh "echo hello"
            }
        }
    }
}