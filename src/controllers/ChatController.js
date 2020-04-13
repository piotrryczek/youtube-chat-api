import Message from 'models/message';

class ChatController {
  display = async (ctx) => {
    const messages = await Message.find({}, {}, { sort: { _id: -1 } }).limit(30);

    messages.reverse();

    await ctx.render('chat', { messages });
  }
}

export default new ChatController();
