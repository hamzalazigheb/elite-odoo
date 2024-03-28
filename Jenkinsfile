pipeline {
    agent any
    
    environment {
        // Define SonarQube token
        SONAR_TOKEN = credentials('jenkins-sonar')
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                git 'https://github.com/hamzalazigheb/elite-odoo.git'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building...'
                sh './mvnw clean package'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                // Add your test execution steps here
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube analysis...'
                withSonarQubeEnv(installationName: 'jenkins-sonar') {
                    sh './mvnw clean org.sonarsource.scanner.maven:sonar-maven-plugin:3.9.0.2155:sonar'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Add your deployment steps here
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded!'
            // Add any success post-build actions here
        }
        failure {
            echo 'Pipeline failed!'
            // Add any failure post-build actions here
        }
    }
}


