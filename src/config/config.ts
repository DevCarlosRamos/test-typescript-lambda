const DB = {
      URI: process.env.MONGODB_URI || 'mongodb+srv://',
      USER: process.env.MONGODB_USER ||'carlos:',
      PASSWORD: process.env.MONGODB_PASSWORD ||'qjBYSGiqm5LEiaLQ',
      CLUSTER: process.env.CLUSTER || '@dbculqi.u95yuqk.mongodb.net/test'
    }

const clave = {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken'
    }
  
export default {DB,clave}