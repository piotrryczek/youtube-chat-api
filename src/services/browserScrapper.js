import puppeteer from 'puppeteer';

class BrowserScrapper {
  videoId = null;

  browser = null;

  page = null;

  settings = ['--disable-setuid-sandbox', '--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-extensions', 'start-maximized', '--disable-gpu', 'disable-infobars', '--single-process'];

  constructor(videoId) {
    this.videoId = videoId;
  }

  init = async () => {
    this.browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser',
      args: this.settings,
    });

    this.page = await this.browser.newPage();
    await this.page.goto(`https://www.youtube.com/live_chat?v=${this.videoId}`);
  }

  close = async () => {
    await this.browser.close();
  }

  scrapMessages = async () => {
    const messages = await this.page.evaluate(() => {
      // eslint-disable-next-line no-undef
      const ytChatMessages = document.querySelectorAll('yt-live-chat-text-message-renderer');

      const parsedMessages = Array.from(ytChatMessages).map((message) => {
        const chipBadges = message.querySelector('#chip-badges');
        if (chipBadges) chipBadges.remove();

        const ytMessageId = message.getAttribute('id');
        const authorType = message.getAttribute('author-type');

        const isOwner = authorType === 'owner';
        const isSponsor = authorType === 'member';
        const isModerator = authorType === 'moderator';

        const authorName = message.querySelector('#author-name').innerHTML;
        const content = message.querySelector('#message').innerHTML;

        return {
          ytMessageId,
          content,
          authorName,
          isOwner,
          isSponsor,
          isModerator,
        };
      });

      return parsedMessages;
    });


    return messages;
  }
}

export default BrowserScrapper;
