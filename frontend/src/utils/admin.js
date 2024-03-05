export const messagesStats = (data) => {
  let deletedMessagesCount = 0;
  let likedMessagesCount = 0;
  let unlikedMessagesCount = 0;

  data.chats.forEach((chat) => {
    chat.messages.forEach((message) => {
      if (message.isDeleted) {
        deletedMessagesCount++;
      }
      if (!message.isDeleted && message.data?.likedByUser === 1) {
        likedMessagesCount++;
      }
      if (!message.isDeleted && message.data?.likedByUser === -1) {
        unlikedMessagesCount++;
      }
    });
  });

  return { deletedMessagesCount, likedMessagesCount, unlikedMessagesCount };
};

export const transformUsersData = (data) => {
  console.log("the data for transformUsersData", data);
  const newData = [];
  // Transform your users' data into rows for the DataGrid
  data?.forEach((user) => {
    console.log("dd?.forEach", user);
    user?.chats.forEach((chat) => {
      chat.messages.forEach((message) => {
        newData.push({
          id: message._id,
          username: user.username,
          chat: { title: chat.title, isDeleted: chat.isDeleted },
          message: {
            content: message.data.content,
            isLiked: message.data?.likedByUser,
            isDeleted: message.isDeleted,
            isUser: message.isUser,
            createdAt: message.timestamp,
          },
          // Add more data fields as needed
        });
      });
    });
  });
  console.log("newData", newData);
  newData.sort((a, b) => a.username - b.username);
  return newData;
};
