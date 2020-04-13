export const messageParser = (message) => {
  const {
    id: ytMessageId,
    snippet: {
      publishedAt,
      displayMessage: content,
    },
    authorDetails: {
      channelId,
      displayName: authorName,
      isChatOwner: isOwner,
      isChatSponsor: isSponsor,
      isChatModerator: isModerator,
    },
  } = message;

  return {
    ytMessageId,
    publishedAt,
    content,
    channelId,
    authorName,
    isOwner,
    isSponsor,
    isModerator,
  };
};

export const getMessagesAfter = (messages, lastYtMessageId = null) => {
  const lastMessageIndex = messages.findIndex(({ ytMessageId }) => ytMessageId === lastYtMessageId);

  return messages.filter((_, index) => index > lastMessageIndex);
};
