import combineRouters from 'koa-combine-routers';

import appRoutes from './app';
import chatRoutes from './chat';
import messagesRoutes from './messages';

export default combineRouters(
  appRoutes,
  chatRoutes,
  messagesRoutes,
);
