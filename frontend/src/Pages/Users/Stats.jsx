import React, { memo, useEffect, useMemo } from "react";
import { Mail, MessageCircle, ThumbsDown, ThumbsUp, User } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import ReactECharts from "echarts-for-react";
import { defaultOptions } from "../../utils/Chart/defaultOptions";
import { getUsers } from "../../redux/actions/UserActions";
import MainLoader from "../../components/Loaders/MainLoader";
import MessagesTable from "../Stats/MessagesTable";
import ChatsTable from "../Stats/ChatsTable";

const Stats = () => {
  const {
    users: { stats, loading },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const cards = useMemo(() => {
    return [
      // {
      //   title: "Deleted Users",
      //   value: stats.deletedUsers,
      //   icon: <User size={20} className="text-error" />,
      // },
      {
        title: "Total Chats",
        value: stats.totalChats,
        icon: <MessageCircle size={20} className="text-success" />,
      },
      {
        title: "Deleted Chats",
        value: stats.deletedChats,
        icon: <MessageCircle size={20} className="text-error" />,
      },
      {
        title: "Total Messages",
        value: stats.totalMessages,
        icon: <Mail size={20} className="text-success" />,
      },
      {
        title: "Deleted Messages",
        value: stats.deletedMessages,
        icon: <Mail size={20} className="text-error" />,
      },
      {
        title: "Liked Messages",
        value: stats.messageReactions?.likeCount,
        icon: <ThumbsUp size={20} className="text-success" />,
      },
      {
        title: "UnLiked Messages",
        value: stats.messageReactions?.dislikeCount,

        icon: <ThumbsDown size={20} className="text-error" />,
      },
      {
        title: "Neutral Messages",
        value: stats.messageReactions?.nullCount,
        icon: "-",
      },
    ];
  }, [stats]);
  const msgDD = [
    {
      _id: "65e7373519914d9f21281605",
      username: "Fouad",
      count: 4,
    },
    {
      _id: "65e73ba219914d9f21281607",
      username: "younes",
      count: 71,
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
  console.log("Messages sup", stats?.deletedMessagesByUser);
  return (
    <div>
      {loading && <MainLoader />}
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
          data={stats.deletedChatsByUser ?? []}
          title="Chats supprimées"
        />
        <PieChart
          data={stats.deletedMessagesByUser ?? []}
          title="Messages supprimés"
        />
      </div>
      <div className="flex gap-2">
        <PieChart
          data={stats.chatsByUser ?? []}
          title="Chats par utilisateur"
        />
        <PieChart
          data={stats.messagesByUser ?? []}
          title="Messages par utilisateur"
        />
      </div>
      <LineChart data={stats.messageReactionsByUser ?? []} />
      <BarChart data={stats.messageReactionsByUser ?? []} />
      <MessagesTable />
      <ChatsTable />
    </div>
  );
};

export default memo(Stats);

const PieChart = ({ data, title }) => {
  const option = {
    title: {
      text: title,
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: "50%",
        data: data.map((item) => ({
          name: item.username,
          value: item.count,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
  );
};
const LineChart = ({ data }) => {
  const {
    dataZoom: zoom,
    toolbox: {
      feature: { saveAsImage, dataZoom, restore },
    },
  } = defaultOptions;
  const option = {
    title: {
      text: "Messages Reactions",
      x: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Neutre", "Like", "Dislike"],
      top: 30,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.username),
      axisLabel: {
        hideOverlap: true,
      },
    },
    yAxis: {
      type: "value",
      min: "dataMin",
      axisLabel: {
        hideOverlap: true,
      },
      splitLine: {
        show: false,
      },
    },
    toolbox: {
      feature: {
        saveAsImage,
        dataZoom,
        restore,
      },
      top: "20px",
    },
    series: [
      {
        name: "Neutre",
        type: "line",
        data: data.map((item) => item.nullCount),
      },
      {
        name: "Like",
        type: "line",
        data: data.map((item) => item.likeCount),
      },
      {
        name: "Dislike",
        type: "line",
        data: data.map((item) => item.dislikeCount),
      },
    ],
    dataZoom: zoom,
  };

  return (
    <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
  );
};
const BarChart = ({ data }) => {
  const {
    dataZoom: zoom,
    toolbox: {
      feature: { saveAsImage, dataZoom, restore },
    },
  } = defaultOptions;
  const option = {
    title: {
      text: "Messages Reactions",
      x: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Neutre", "Like", "Dislike"],
      top: 30,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.username),
      axisLabel: {
        hideOverlap: true,
      },
    },
    yAxis: {
      type: "value",
      min: "dataMin",
      axisLabel: {
        hideOverlap: true,
      },
      splitLine: {
        show: false,
      },
    },
    toolbox: {
      feature: {
        saveAsImage,
        dataZoom,
        restore,
      },
      top: "20px",
    },
    series: [
      {
        name: "Neutre",
        type: "bar", // Change type to "bar"
        data: data.map((item) => item.nullCount),
      },
      {
        name: "Like",
        type: "bar", // Change type to "bar"
        data: data.map((item) => item.likeCount),
      },
      {
        name: "Dislike",
        type: "bar", // Change type to "bar"
        data: data.map((item) => item.dislikeCount),
      },
    ],
    dataZoom: zoom,
  };

  return (
    <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
  );
};
