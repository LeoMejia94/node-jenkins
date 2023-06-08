pipeline {
    agent any

    stages {
        stages('Clonar el repositorio'){
            steps {
                git branch: 'main', credentialsId: 'git-jenkins', url: 'https://github.com/LeoMejia94/node-jenkins.git'
            }

        }

        stages('Construir imagen de Docker'){
            steps{
            withCredentials([
                string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
            ])  {
                docker.build('proyectos-backend-micro:v1', '--build-arg MONGO_URI=${MONGO_URI} .')
            }
        }

        stages('Desplegar contenedores Docker'){
            steps {
                script {
                    withCredentials([
                          string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                    ]) {
                        sh """
                            sed 's|\\${MONGO_URI}|${MONGO_URI}|g' docker-compose.yml > docker-compose-update.yml
                            docker-compose -f docker-compose-update.yml up -d
                        """
                    }
                   
                }
            }
        }


    }
}
}