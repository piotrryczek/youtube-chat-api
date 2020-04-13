import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import views from 'koa-views';
import cors from '@koa/cors';

import router from 'routes';
import db from 'config/db';

db.on('error', (error) => {
  console.log(`Mongoose connection error: ${error}`);
});

const app = new Koa();
app.use(bodyParser());
app.use(views(`${__dirname}/views`, { extension: 'pug' }));
app.use(cors());

app.on('error', (error) => {
  console.log(error);
});

app.use(router());

export default app;
