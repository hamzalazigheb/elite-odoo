pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout your source code from your repository
                git 'https://github.com/hamzalazigheb/elite-odoo'
            }
        }
        
        stage('Build') {
            steps {
                // Example: Maven build
                sh 'mvn clean install'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                // Run SonarQube analysis
                script {
                    def scannerHome = tool 'sonarqube_scanner'
                    withSonarQubeEnv('SonarQube Server') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                // Wait for SonarQube analysis to complete and check Quality Gate status
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate()
                }
            }
        }
    }
    
    post {
        always {
            // Clean up temporary files, etc.
        }
        
        success {
            // Actions to perform when the pipeline succeeds
        }
        
        failure {
            // Actions to perform when the pipeline fails
        }
    }
}
