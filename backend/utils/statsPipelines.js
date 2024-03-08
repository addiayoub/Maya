const statsPipelines = {
  deletedUsers: [
    {
      $match: {
        isDeleted: true,
      },
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1,
        },
      },
    },
  ],
  totalMessages: [
    {
      $unwind: "$chats",
    },
    {
      $unwind: "$chats.messages",
    },
    {
      $group: {
        _id: null,
        totalMessages: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalMessages: 1,
      },
    },
  ],
  totalChats: [
    {
      $unwind: "$chats",
    },
    {
      $unwind: "$chats",
    },
    {
      $group: {
        _id: null,
        totalChats: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalChats: 1,
      },
    },
  ],
  deletedMessages: [
    {
      $unwind: "$chats",
    },
    {
      $unwind: "$chats.messages",
    },
    {
      $match: {
        "chats.messages.isDeleted": true,
      },
    },
    {
      $group: {
        _id: null,
        deletedMessages: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        deletedMessages: 1,
      },
    },
  ],
  deletedChats: [
    {
      $unwind: "$chats",
    },
    {
      $match: {
        "chats.isDeleted": true,
      },
    },
    {
      $group: {
        _id: null,
        deletedChats: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        deletedChats: 1,
      },
    },
  ],
  messagesByUser: [
    {
      $unwind: "$chats",
    },
    {
      $unwind: {
        path: "$chats.messages",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        username: { $first: "$username" },
        count: { $sum: 1 },
      },
    },
  ],
  deletedMessagesByUser: [
    {
      $unwind: "$chats",
    },
    {
      $unwind: {
        path: "$chats.messages",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        username: { $first: "$username" },
        count: {
          $sum: { $cond: [{ $eq: ["$chats.messages.isDeleted", true] }, 1, 0] },
        },
      },
    },
  ],
  chatsByUser: [
    {
      $unwind: "$chats",
    },
    {
      $unwind: {
        path: "$chats",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        username: { $first: "$username" },
        count: { $sum: 1 },
      },
    },
  ],
  deletedChatsByUser: [
    {
      $unwind: "$chats",
    },
    {
      $group: {
        _id: "$_id",
        username: { $first: "$username" },
        count: { $sum: { $cond: [{ $eq: ["$chats.isDeleted", true] }, 1, 0] } },
      },
    },
  ],
  messageReactions: [
    {
      $unwind: "$chats",
    },
    {
      $unwind: "$chats.messages",
    },
    {
      $match: {
        "chats.messages.isDeleted": false,
      },
    },
    {
      $group: {
        _id: null,
        nullCount: {
          $sum: {
            $cond: [{ $eq: ["$chats.messages.output.likedByUser", 0] }, 1, 0],
          },
        },
        likeCount: {
          $sum: {
            $cond: [{ $eq: ["$chats.messages.output.likedByUser", 1] }, 1, 0],
          },
        },
        dislikeCount: {
          $sum: {
            $cond: [{ $eq: ["$chats.messages.output.likedByUser", -1] }, 1, 0],
          },
        },
      },
    },
  ],
  messageReactionsByUser: [
    {
      $unwind: "$chats",
    },
    {
      $unwind: "$chats.messages",
    },
    {
      $match: {
        "chats.messages.isDeleted": false,
      },
    },
    {
      $group: {
        _id: "$_id",
        username: { $first: "$username" },
        nullCount: {
          $sum: {
            $cond: [{ $eq: ["$chats.messages.output.likedByUser", 0] }, 1, 0],
          },
        },
        likeCount: {
          $sum: {
            $cond: [{ $eq: ["$chats.messages.output.likedByUser", 1] }, 1, 0],
          },
        },
        dislikeCount: {
          $sum: {
            $cond: [{ $eq: ["$chats.messages.output.likedByUser", -1] }, 1, 0],
          },
        },
      },
    },
  ],
};
module.exports = statsPipelines;
