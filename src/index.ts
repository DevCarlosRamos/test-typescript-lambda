import serverless from 'serverless-http';
import app from './app';
import './database';

const handler = serverless(app)
export { handler, app }
