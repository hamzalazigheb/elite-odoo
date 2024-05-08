pipeline {
    agent any
    
    parameters {
        string(name: 'REPO_URL', defaultValue: '', description: 'Git repository URL')
        string(name: 'SONAR_PROJECT_KEY', defaultValue: '', description: 'SonarQube project key')
        string(name: 'SONAR_PROJECT_NAME', defaultValue: '', description: 'SonarQube project name')
    }

    stages {
        stage('Git Clone') {
            steps {
                script {
                    if (params.REPO_URL == '') {
                        error "Git repository URL not provided."
                    }
                    // Clone repository
                    checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: params.REPO_URL]]])
                }
            }
        }
        
        stage('Create SonarQube Project') {
            steps {
                script {
                    if (params.SONAR_PROJECT_KEY == '') {
                        echo "SonarQube project key not provided. Generating..."
                        def projectName = params.SONAR_PROJECT_NAME != '' ? params.SONAR_PROJECT_NAME : 'AutoGeneratedProject'
                        def projectKey = projectName.replaceAll('[^a-zA-Z0-9]', '_')
                        params.SONAR_PROJECT_KEY = projectKey
                    }

                    // Use SonarQube Web API to create a new project
                    // You'll need to authenticate and construct the appropriate API call
                    // Example:
                    sh "curl -X POST -u admin:12341234 'https://22d8-196-179-220-246.ngrok-free.app/api/projects/create?name=${params.SONAR_PROJECT_NAME}&project=${params.SONAR_PROJECT_KEY}'"
                }
            }
        }
        
        stage('Run SonarQube Analysis') {
            steps {
                script {
                    // Retrieve SonarScanner tool
                    def scannerHome = tool 'SonarScanner';
                    
                    // Run SonarQube analysis
                    withSonarQubeEnv() {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
    }
}


