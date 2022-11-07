# Rest api serverless with Node
###### En este proyecto se implemento:

- Node.js v18  en desarrollo y v16 en producción
- Serverless
- Lambda
- MongoDb
- Express
- Typescript
- Jest

###### Dependencias de node:
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.17.1",
    "mongoose": "^6.7.1",
    "morgan": "^1.10.0",
    "serverless-http": "^2.7.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.12",
    "@types/express": "^4.17.14",
    "@types/jest": "^29.2.2",
    "@types/mongoose": "^5.11.97",
    "@types/morgan": "^1.9.3",
    "@types/supertest": "^2.0.12",
    "jest": "^29.2.2",
    "nodemon": "^2.0.20",
    "supertest": "^6.3.1",
    "ts-jest": "^29.0.3",
    "tsc-watch": "^5.0.3",
    "typescript": "^4.8.4"
  }

###### Link de proyecto desplegado en aws:
[click para ver el proyecto](https://7rwmkw3wk0.execute-api.us-east-1.amazonaws.com/ "ver cards")

------------

#### Pasos para desplegarlo:
- Clonar el respositorio:
`git clone https://github.com/DevCarlosRamos/test-typescript-lambda.git`

- Instalar dependencias:
`npm install`

- correr entorno local:
npm run dev

- correr jest:
npm run test
