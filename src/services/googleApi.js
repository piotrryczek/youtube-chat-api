import axios from 'axios';

class GoogleApi {
  baseUrl = 'https://www.googleapis.com/youtube/v3';

  getLiveChatId = async (videoId) => {
    const { data } = await axios.get(`${this.baseUrl}/videos?id=${videoId}&part=liveStreamingDetails,snippet,id&key=${process.env.GOOGLE_API_KEY}`);

    return data.items[0].liveStreamingDetails.activeLiveChatId;
  }

  getMessages = async (liveChatId) => {
    const { data } = await axios.get(`${this.baseUrl}/liveChat/messages?liveChatId=${liveChatId}&part=authorDetails,snippet,id&key=${process.env.GOOGLE_API_KEY}`);

    const { items: messages } = data;

    return messages;
  }
}

export default new GoogleApi();
