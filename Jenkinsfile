pipeline {
    agent any
    
    options {
        // Define SonarQube token
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
                withSonarQubeEnv(installationName:'jenkins-sonar') {
                    sh './mvnw clean org.sonarsource.scanner.maven:sonar-maven-plugin:3.9.0.2155:sonar'
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                script {
                    def qg = waitForQualityGate()
                    if (qg.status != 'OK') {
                        error "Pipeline aborted due to Quality Gate failure: ${qg.status}"
                    }
                }
            }
        }
    }
}

    
    
}

