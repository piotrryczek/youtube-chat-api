import Router from 'koa-router';

import AppController from 'controllers/AppController';

const router = new Router({ prefix: '/app' });

router.get('/start/:videoId', AppController.start);
router.get('/stop', AppController.stop);

export default router;
