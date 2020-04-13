import messagesManager from 'services/messagesManager';

class AppController {
  start = (ctx) => {
    const {
      params: {
        videoId,
      },
    } = ctx;

    messagesManager.start(videoId);

    ctx.body = {
      success: true,
    };
  }

  stop = (ctx) => {
    messagesManager.stop();

    ctx.body = {
      success: true,
    };
  }
}

export default new AppController();
