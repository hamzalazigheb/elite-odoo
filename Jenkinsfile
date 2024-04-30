pipeline {
    agent any
    stages {
        stage("Build & SonarQube Scanner") {
            steps {
            
                // Run SonarQube analysis
                withSonarQubeEnv('sonarqube-server') {
                    // You may need to adjust the paths accordingly
                    sh 'sonar-scanner -Dsonar.projectKey=website'
                }
            }
        }
    }
}
