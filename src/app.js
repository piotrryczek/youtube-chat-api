import Koa from 'koa';

import ChatScrapper from './services/chatScrapper';


const app = new Koa();

const chatScrapper = new ChatScrapper('https://www.youtube.com/live_chat?is_popout=1&v=SLV1B5Lzy48');

setTimeout(async () => {
  chatScrapper.start();
}, 0);


export default app;
