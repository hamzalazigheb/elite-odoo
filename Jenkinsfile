pipeline {
    agent any
    
    environment {
        SONAR_TOKEN = credentials('sonarqube_token')
        MAVEN_HOME = tool 'maven'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                git 'https://github.com/hamzalazigheb/elite-odoo'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building project...'
                sh "${MAVEN_HOME}/bin/mvn clean install"
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube analysis...'
                withSonarQubeEnv('SonarQube Server') {
                    sh "${MAVEN_HOME}/bin/mvn sonar:sonar -Dsonar.login=$SONAR_TOKEN"
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


