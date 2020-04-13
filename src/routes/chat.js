import Router from 'koa-router';

import ChatController from 'controllers/ChatController';

const router = new Router({ prefix: '/chat' });

router.get('/', ChatController.display);

export default router;
