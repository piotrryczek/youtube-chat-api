// import googleApi from 'services/googleApi';
import Message from 'models/message';
import ioServer from 'services/ioServer';

import BrowserScrapper from 'services/browserScrapper';

import { getMessagesAfter } from 'utilities/helpers';

class MessagesManager {
  videoId = '';

  scrappingInterval = null;

  isFirstScrap = null

  start = async (videoId) => {
    await Message.remove({});

    this.scrapper = new BrowserScrapper(videoId);
    await this.scrapper.init();

    await this.fillMessages(); // First Scrap

    this.scrappingInterval = setInterval(() => {
      this.fillMessages();
    }, 2000);
  }

  stop = async () => {
    clearInterval(this.scrappingInterval);
  }


  fillMessages = async () => {
    const messages = await this.scrapper.scrapMessages();

    const [lastMessage] = await Message.find().sort({ _id: -1 }).limit(1);

    const messagesToAdd = lastMessage ? getMessagesAfter(messages, lastMessage.ytMessageId) : messages;

    if (messagesToAdd.length) {
      const addedMessages = await Message.insertMany(messagesToAdd);

      ioServer.send('messages', addedMessages);
    }
  }
}

export default new MessagesManager();
