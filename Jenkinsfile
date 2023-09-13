pipeline {
    
    agent any
    
    parameters{
        string defaultValue: 'bbog', description: 'Indicar el banco a compilar bbog, bavv, bocc, bpop', name: 'banco'
    }

    stages{
        stage("Clonando repositorio git Icbs Mobile Responsive"){
            steps{
                    sh "git clone -b develop git@git.solem.cl:mobile/icbs-mobil-front-responsive.git"
            }
        }
        stage("Instalando dependencias"){
            steps{
                echo "Prettier"
                echo "=============================================================================="
                sh "npm i @tanstack/vue-query"
                sh "npm install axios"
                sh "npm i jsencrypt"
                sh "npm install pinia"
                sh "npm install vue-router@4"
                sh "npm install vue3-lottie@latest --save"
                sh "npm install --save-dev --save-exact prettier"
                sh "npm i sass"

                echo "Vite"
                echo "=============================================================================="
                sh "npm create vite@latest"
            }
        }
        stage("Análisis de Sintaxis"){
            steps{
                script{
                    sh "npm run lint"
                    echo "Termina NPM"
                }
            }
        }

        stage("Compilación"){
            steps{
                script{
                    sh "npm run build-${banco}"
                }
            }
        }

        stage("Estructura"){
            steps{
                script{
                    echo "${WORKSPACE}"
                    echo "Limpiando estructura según Banco ${banco}"
                    if (banco == 'bocc') {
                        sh "rm -rf ${WORKSPACE}/dist/bavv && rm -rf ${WORKSPACE}/dist/bpop && rm -rf ${WORKSPACE}/dist/bbog"
                    }
                    if (banco == 'bavv') {
                        sh "rm -rf ${WORKSPACE}/dist/bocc && rm -rf ${WORKSPACE}/dist/bpop && rm -rf ${WORKSPACE}/dist/bbog"
                    }
                    if (banco == 'bpop') {
                        sh "rm -rf ${WORKSPACE}/dist/bavv && rm -rf ${WORKSPACE}/dist/bocc && rm -rf ${WORKSPACE}/dist/bbog"
                    }
                    if (banco == 'bbog') {
                        sh "rm -rf ${WORKSPACE}/dist/bavv && rm -rf ${WORKSPACE}/dist/bpop && rm -rf ${WORKSPACE}/dist/bocc"
                    }
                    sh "rm -rf /var/lib/jenkins/workspace/front-out-dir/*"
                    sh "cp -R ${WORKSPACE}/dist/* /var/lib/jenkins/workspace/front-out-dir/"
                }
            }
        }
        // stage("Analisis SonarQube") {
        //     steps {
        //         script {
        //             sonarAnalysis()
        //         }
        //     }
        // }
    }

    post{
        failure{
            slackSend (channel: '#icbs-desarrollo', color: 'danger', message: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}console)")
        }
        success{
            slackSend (channel: '#icbs-desarrollo', color: 'good', message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}console)")
        }
        always{
            deleteDir()
        }
    }
}
