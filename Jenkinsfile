pipeline {
        agent none
        stages {
         
          stage("build & SonarQube Scanner") {
            agent any
            steps {
              withSonarQubeEnv('sonarqube-server') {
                sh 'mvn clean package sonar:sonar'
              }
            }
          }
        }
      }
