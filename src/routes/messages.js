import Router from 'koa-router';

import MessagesController from 'controllers/MessagesController';
import { queryStringMiddleware } from 'utilities/middlewares';

const router = new Router({ prefix: '/messages' });

router.get('/', queryStringMiddleware, MessagesController.index);
router.patch('/:id/setQuestion', MessagesController.setQuestion);
router.patch('/:id/unsetQuestion', MessagesController.unsetQuestion);

export default router;
