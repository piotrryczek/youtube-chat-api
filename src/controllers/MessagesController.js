import Message from 'models/message';
import ioServer from 'services/ioServer';

class MessagesController {
  index = async (ctx) => {
    const {
      queryParsed: {
        limit = 30,
      },
    } = ctx;

    const messages = await Message.getLast(+limit);

    ctx.body = {
      success: true,
      data: messages,
    };
  }

  setQuestion = async (ctx) => {
    const {
      params: {
        id: messageId,
      },
    } = ctx;

    const message = await Message.findById(messageId);

    Object.assign(message, {
      isQuestion: true,
    });

    await message.save();

    ioServer.send('setQuestion', messageId);

    ctx.body = {
      success: true,
    };
  }

  unsetQuestion = async (ctx) => {
    const {
      params: {
        id: messageId,
      },
    } = ctx;

    const message = await Message.findById(messageId);

    Object.assign(message, {
      isQuestion: false,
    });

    await message.save();

    ioServer.send('unsetQuestion', messageId);

    ctx.body = {
      success: true,
    };
  }
}

export default new MessagesController();
