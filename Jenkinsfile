// ============================================================
// Jenkinsfile - Amazon.ca iPhone 16 Pro Playwright E2E Pipeline
// Author: Jalapathi
// Description: Automated pipeline to install deps, run Playwright
//              tests for Amazon.ca iPhone 16 Pro search, and
//              export test results as Jenkins artifacts.
// ============================================================

pipeline {
    agent any

    tools {
        // 'NodeJS' must match the name configured in:
        // Jenkins > Manage Jenkins > Global Tool Configuration > NodeJS
        nodejs 'NodeJS'
    }

    environment {
        CI                       = 'true'
        // Install Playwright browsers inside project node_modules
        PLAYWRIGHT_BROWSERS_PATH = '0'
        // Target test file
        TEST_FILE                = 'tests/Amazon.spec.ts'
        // Report directories
        PLAYWRIGHT_REPORT_DIR    = 'playwright-report'
        ALLURE_RESULTS_DIR       = 'allure-results'
        TEST_RESULTS_DIR         = 'test-results'
    }

    options {
        timeout(time: 45, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    stages {

        // ──────────────────────────────────────────────────────
        // Stage 1: Checkout Source Code
        // ──────────────────────────────────────────────────────
        stage('Checkout') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
            }
        }

        // ──────────────────────────────────────────────────────
        // Stage 2: Verify Environment & Node.js Version
        // ──────────────────────────────────────────────────────
        stage('Verify Environment') {
            steps {
                echo '🔍 Verifying environment setup...'
                bat 'node --version'
                bat 'npm --version'
                bat 'echo PATH: %PATH%'
            }
        }

        // ──────────────────────────────────────────────────────
        // Stage 3: Install Node.js Dependencies
        // Uses `npm ci` for clean, reproducible installs from
        // package-lock.json (preferred for CI environments)
        // ──────────────────────────────────────────────────────
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing Node.js dependencies using npm ci...'
                bat 'npm ci'
            }
        }

        // ──────────────────────────────────────────────────────
        // Stage 4: Install Playwright Browsers
        // Only installs Chromium to reduce build time,
        // since the test is configured to run on Chrome/Chromium
        // ──────────────────────────────────────────────────────
        stage('Install Playwright Browsers') {
            steps {
                echo '🌐 Installing Playwright Chromium browser and system dependencies...'
                bat 'npx playwright install --with-deps chromium'
            }
        }

        // ──────────────────────────────────────────────────────
        // Stage 5: Create Required Output Directories
        // Ensures output directories exist before test execution
        // ──────────────────────────────────────────────────────
        stage('Prepare Test Directories') {
            steps {
                echo '📁 Preparing test output directories...'
                bat '''
                    if not exist "playwright-report" mkdir playwright-report
                    if not exist "allure-results"    mkdir allure-results
                    if not exist "test-results"      mkdir test-results
                    if not exist "videos"            mkdir videos
                    if not exist "screenshots"       mkdir screenshots
                '''
            }
        }

        // ──────────────────────────────────────────────────────
        // Stage 6: Run Amazon.ca iPhone 16 Pro Playwright Tests
        // Runs only the Amazon.spec.ts file with:
        //   - HTML reporter (for Playwright report)
        //   - Line reporter (for console logs in Jenkins)
        //   - Allure reporter (for historical trend reports)
        // ──────────────────────────────────────────────────────
        stage('Run Playwright Tests - Amazon iPhone 16 Pro') {
            steps {
                echo '🚀 Running Amazon.ca iPhone 16 Pro Playwright tests...'
                // Run only the Amazon.spec.ts test, exit 0 to allow post actions even on failure
                bat '''
                    npx playwright test tests/Amazon.spec.ts --reporter=html,line,allure-playwright
                    exit /b 0
                '''
            }
        }

        // ──────────────────────────────────────────────────────
        // Stage 7: Generate Allure Report
        // Generates a standalone HTML Allure report from results
        // ──────────────────────────────────────────────────────
        stage('Generate Allure Report') {
            steps {
                echo '📊 Generating Allure test report...'
                bat 'npx allure generate allure-results --clean --output allure-report'
            }
        }

    } // end stages

    // ──────────────────────────────────────────────────────────
    // Post Actions: Always runs after stages complete or fail
    // Exports test results as Jenkins build artifacts
    // ──────────────────────────────────────────────────────────
    post {
        always {
            echo '📁 Archiving all test artifacts...'

            // ── Playwright HTML Report ──────────────────────────
            // Publishes the built-in Playwright HTML report
            // Requires the "HTML Publisher" plugin in Jenkins
            publishHTML(target: [
                allowMissing         : true,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : 'playwright-report',
                reportFiles          : 'index.html',
                reportName           : '📋 Playwright Report - Amazon iPhone 16 Pro'
            ])

            // ── Allure HTML Report ──────────────────────────────
            // Publishes Allure report (requires Allure Jenkins plugin)
            publishHTML(target: [
                allowMissing         : true,
                alwaysLinkToLastBuild: true,
                keepAll              : true,
                reportDir            : 'allure-report',
                reportFiles          : 'index.html',
                reportName           : '📊 Allure Report - Amazon iPhone 16 Pro'
            ])

            // ── Archive Raw Allure Results ──────────────────────
            // Raw JSON/XML results used to regenerate Allure reports
            archiveArtifacts(
                artifacts        : 'allure-results/**',
                allowEmptyArchive: true,
                fingerprint      : true
            )

            // ── Archive Test Result Screenshots ────────────────
            // Screenshots captured during test execution
            archiveArtifacts(
                artifacts        : 'test-results/**/*.png',
                allowEmptyArchive: true,
                fingerprint      : true
            )

            // ── Archive Videos (recorded on failure) ───────────
            archiveArtifacts(
                artifacts        : 'videos/**',
                allowEmptyArchive: true,
                fingerprint      : true
            )

            // ── Archive Playwright Traces ───────────────────────
            // Trace files (.zip) for debugging failing tests
            archiveArtifacts(
                artifacts        : 'test-results/**/*.zip',
                allowEmptyArchive: true,
                fingerprint      : true
            )

            // ── Archive Screenshots on Failure ──────────────────
            archiveArtifacts(
                artifacts        : 'screenshots/**',
                allowEmptyArchive: true,
                fingerprint      : true
            )

            // ── Archive the full Playwright HTML report dir ─────
            archiveArtifacts(
                artifacts        : 'playwright-report/**',
                allowEmptyArchive: true,
                fingerprint      : true
            )

            echo '✅ All artifacts archived successfully!'

        } // end always

        success {
            echo '''
╔══════════════════════════════════════════════════════╗
║  ✅ ALL PLAYWRIGHT TESTS PASSED!                     ║
║  Amazon.ca - iPhone 16 Pro Search & Lowest Price     ║
║  Check the Playwright Report for detailed results.   ║
╚══════════════════════════════════════════════════════╝
            '''
        }

        failure {
            echo '''
╔══════════════════════════════════════════════════════╗
║  ❌ SOME PLAYWRIGHT TESTS FAILED!                    ║
║  Amazon.ca - iPhone 16 Pro Search & Lowest Price     ║
║  Check Playwright Report & Allure for details.       ║
║  Review traces in test-results/**/*.zip              ║
╚══════════════════════════════════════════════════════╝
            '''
        }

        unstable {
            echo '⚠️ Build is UNSTABLE - Some tests may have been flaky. Review the reports.'
        }

    } // end post

} // end pipeline
