pipeline {
    agent any
    stages {
        stage("Build & SonarQube Scanner") {
            steps {
                // Clone your Odoo project repository
                git 'https://github.com/itpp-labs/pos-addons.git'
                
                // Install Odoo dependencies and execute Odoo tests
                sh 'pip3 install -r requirements.txt'
                
                // Run SonarQube analysis
                withSonarQubeEnv('sonarqube-server') {
                    // You may need to adjust the paths accordingly
                    sh 'sonar-scanner -Dsonar.projectKey=website -Dsonar.sources=./addons'
                }
            }
        }
    }
}
