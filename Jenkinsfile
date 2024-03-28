pipeline {
    agent any
    
    environment {
        SONAR_TOKEN = credentials('jenkins-sonar')
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                git 'https://github.com/hamzalazigheb/elite-odoo'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube analysis...'
                withSonarQubeEnv('SonarQube Server') {
                    sh 'sonar-scanner -Dsonar.login=$SONAR_TOKEN'
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up...'
        }
        
        success {
            echo 'Pipeline succeeded!'
        }
        
        failure {
            echo 'Pipeline failed!'
        }
    }
}

