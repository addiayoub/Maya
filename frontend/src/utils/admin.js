export const messagesStats = (data) => {
  let deletedMessagesCount = 0;
  let likedMessagesCount = 0;
  let unlikedMessagesCount = 0;

  data.chats.forEach((chat) => {
    chat.messages.forEach((message) => {
      if (message.isDeleted) {
        deletedMessagesCount++;
      }
      if (!message.isDeleted && message.output?.likedByUser === 1) {
        likedMessagesCount++;
      }
      if (!message.isDeleted && message.output?.likedByUser === -1) {
        unlikedMessagesCount++;
      }
    });
  });
  console.log("Messages stats", {
    deletedMessagesCount,
    likedMessagesCount,
    unlikedMessagesCount,
  });
  return { deletedMessagesCount, likedMessagesCount, unlikedMessagesCount };
};

export const transformUsersData = (data) => {
  console.log("the data for transformUsersData", data);
  const newData = [];
  // Transform your users' data into rows for the DataGrid
  data?.forEach((user) => {
    user?.chats.forEach((chat) => {
      // console.log(`${user.username}: - chat-${chat.title}`, chat.messages);
      chat.messages.forEach(
        ({
          _id,
          isDeleted,
          input: { content: inputConent },
          output: { content, likedByUser, execution_time },
          timestamp,
        }) => {
          newData.push({
            user: {
              username: user.username,
              profile: user.image,
            },
            username: user.username,
            chat: { title: chat.title, isDeleted: chat.isDeleted },
            message: {
              id: _id,
              input: { content: inputConent },
              output: { content, execution_time },
              isLiked: likedByUser,
              isDeleted: isDeleted,
              createdAt: timestamp,
            },
          });
        }
      );
    });
  });
  console.log("newData", newData);
  newData.sort((a, b) => a.username - b.username);
  return newData;
};

export const transformDataChats = (data) => {
  const newData = [];
  // Transform your users' data into rows for the DataGrid
  data?.forEach((user) => {
    user?.chats.forEach((chat) => {
      newData.push({
        user: {
          username: user.username,
          profile: user.image,
        },
        chat: { title: chat.title, isDeleted: chat.isDeleted },
        messagesCount: chat.messages.length,
      });
    });
  });
  console.log("newData", newData);
  newData.sort((a, b) => a.username - b.username);
  return newData;
};
