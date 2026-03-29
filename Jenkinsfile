pipeline {
    agent any

    tools {
        nodejs 'NodeJS'  // Must match the name configured in Jenkins Global Tool Configuration
    }

    environment {
        CI = 'true'
        PLAYWRIGHT_BROWSERS_PATH = '0'  // Install browsers inside node_modules
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm run test:ci'
            }
        }
    }

    post {
        always {
            // Publish Playwright HTML Report
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])

            // Archive Allure results for later generation
            archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true

            // Archive test videos and screenshots on failure
            archiveArtifacts artifacts: 'videos/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'screenshots/**', allowEmptyArchive: true

            // Clean up workspace
            cleanWs()
        }

        success {
            echo '✅ All Playwright tests passed!'
        }

        failure {
            echo '❌ Some Playwright tests failed. Check the Playwright Report for details.'
        }
    }
}
