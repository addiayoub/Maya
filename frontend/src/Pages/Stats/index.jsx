import React, { memo, useEffect, useMemo } from "react";
import { Mail, MessageCircle, ThumbsDown, ThumbsUp, User } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { getStats, getUsers } from "../../redux/actions/UserActions";
import MainLoader from "../../components/Loaders/MainLoader";
import MessagesTable from "./MessagesTable";
import ChatsTable from "./ChatsTable";
import { BarChart, LineChart, PieChart } from "./Charts";

const msgDD = [
  {
    _id: "65e7373519914d9f21281605",
    username: "Fouad",
    count: 4,
  },
  {
    _id: "65e73ba219914d9f21281607",
    username: "younes",
    count: 7,
  },
];
const chatDD = [
  {
    _id: "65e7373519914d9f21281605",
    username: "Fouad",
    count: 8,
  },
  {
    _id: "65e73ba219914d9f21281607",
    username: "younes",
    count: 3,
  },
];

const Stats = () => {
  const {
    stats: { data, loading },
    users,
  } = useSelector((state) => state.user);
  const isLoading = loading || users.loading;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStats());
    dispatch(getUsers());
  }, []);
  const cards = useMemo(() => {
    return [
      {
        title: "Utilisateurs Supprimés",
        value: data.deletedUsers,
        icon: <User size={20} className="text-error" />,
      },
      {
        title: "Chats Total",
        value: data.totalChats,
        icon: <MessageCircle size={20} className="text-success" />,
      },
      {
        title: "Chats Supprimés",
        value: data.deletedChats,
        icon: <MessageCircle size={20} className="text-error" />,
      },
      {
        title: "Messages Total",
        value: data.totalMessages,
        icon: <Mail size={20} className="text-success" />,
      },
      {
        title: "Messages Supprimés",
        value: data.deletedMessages,
        icon: <Mail size={20} className="text-error" />,
      },
      {
        title: "Messages Aimés",
        value: data.messageReactions?.likeCount,
        icon: <ThumbsUp size={20} className="text-success" />,
      },
      {
        title: "Messages Pas Aimés",
        value: data.messageReactions?.dislikeCount,
        icon: <ThumbsDown size={20} className="text-error" />,
      },
      {
        title: "Messages Neutres",
        value: data.messageReactions?.nullCount,
        icon: "-",
      },
    ];
  }, [data]);

  return (
    <div>
      {isLoading && <MainLoader />}
      <div className={`cards`}>
        {cards.map((card, index) => {
          return (
            <div
              className="p-8 rounded-xl flex flex-col gap-x-2 gap-y-4 max-h-[160px] overflow-y-auto shadow-card"
              key={index}
            >
              <div className="flex gap-4 items-center">
                <div className="rounded-full flex items-center justify-center w-12 h-12 flex-shrink-0 border-[1px] border-solid border-muted">
                  {card.icon}
                </div>
                <h4>{card.title}</h4>
              </div>
              <p className="flex items-center gap-2">
                <span className="font-semibold">{card.value}</span>
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <PieChart
          data={data.deletedChatsByUser ?? [] ?? []}
          title="Chats supprimées"
        />
        <PieChart
          data={data.deletedMessagesByUser ?? [] ?? []}
          title="Messages supprimés"
        />
      </div>
      <div className="flex gap-2">
        <PieChart data={data.chatsByUser ?? []} title="Chats par utilisateur" />
        <PieChart
          data={data.messagesByUser ?? []}
          title="Messages par utilisateur"
        />
      </div>
      {/* <LineChart data={data.messageReactionsByUser ?? []} /> */}
      <BarChart data={data.messageReactionsByUser ?? []} />
      <MessagesTable />
      <ChatsTable />
    </div>
  );
};

export default memo(Stats);
