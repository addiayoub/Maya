import { Profile } from "../Users/columns";
import moment from "moment";
import { Eye } from "react-feather";
import { Rating } from "../../components/Helpers";

export const getMsgsColumns = (handler) => {
  return [
    {
      field: "profile",
      headerName: "Profile",
      renderCell: ({ row }) => {
        return <Profile img={row.user.profile} />;
      },
    },
    { field: "username", headerName: "Nom d'utilisateur", width: 170 },
    {
      field: "chat",
      headerName: "Chat Title",
      width: 120,
      valueGetter: ({ row }) => row.chat.title,
      renderCell: ({ row }) => {
        return <p className={``}>{row.chat.title}</p>;
      },
    },
    {
      field: "messages.input",
      headerName: "Input",
      width: 170,
      flex: 1,
      valueGetter: ({ row }) => row.message.input.content,
      renderCell: ({ row }) => {
        const { content } = row.message.input;
        return <p className={``}>{content}</p>;
      },
    },
    {
      field: "messages.output",
      headerName: "Output",
      width: 170,
      flex: 1,
      valueGetter: ({ row }) => row.message.output.content,
      renderCell: ({ row }) => {
        const { content } = row.message.output;
        return <p className={``}>{content}</p>;
      },
    },
    {
      field: "isLiked",
      headerName: "Feedback",
      width: 95,
      headerAlign: "center",
      renderCell: ({ row }) => {
        const { isLiked } = row.message;
        return (
          <span className="min-w-[50px] max-w-[95px] flex items-center justify-center">
            <Rating value={isLiked} />
          </span>
        );
      },
    },
    {
      field: "created at",
      headerName: "Date",
      width: 150,
      valueGetter: ({ row }) => row.message.createdAt,
      renderCell: ({ row }) => {
        const { createdAt } = row.message;
        return <p>{moment(createdAt).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 80,
      renderCell: ({ row }) => {
        return (
          <Eye
            className="cursor-pointer text-primary"
            size={20}
            onClick={() => {
              handler({
                state: true,
                payload: {
                  username: row.username,
                  user: row.user,
                  chat: row.chat,
                  message: row.message,
                },
              });
            }}
          />
        );
      },
    },
  ];
};

export const chatsColumns = [
  {
    field: "profile",
    headerName: "Profile",
    renderCell: ({ row }) => {
      return <Profile img={row.user.profile} />;
    },
  },
  {
    field: "user",
    headerName: "Nom d'utilisateur",
    width: 170,
    valueGetter: ({ row }) => row.user.username,
    renderCell: ({ row }) => <span>{row.user.username}</span>,
  },
  {
    field: "chat",
    headerName: "Chat Title",
    width: 150,
    valueGetter: ({ row }) => row.chat.title,
    renderCell: ({ row }) => {
      return <p>{row.chat.title}</p>;
    },
  },
  {
    field: "messagesCount",
    headerName: "Messages Count",
    width: 150,
    valueGetter: ({ row }) => row.messagesCount,
    renderCell: ({ row }) => {
      return <p>{row.messagesCount}</p>;
    },
  },
];
