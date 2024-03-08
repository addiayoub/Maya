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
      width: 150,
      valueGetter: ({ row }) => row.chat.title,
      renderCell: ({ row }) => {
        return (
          <p className={`${row.chat.isDeleted ? "text-error" : ""}`}>
            {row.chat.title}
          </p>
        );
      },
    },
    {
      field: "messages.input",
      headerName: "Input",
      width: 170,
      flex: 0.5,
      valueGetter: ({ row }) => row.message.input.content,
      renderCell: ({ row }) => {
        const { content } = row.message.input;
        const { isDeleted } = row.message;
        return <p className={`${isDeleted ? "text-error" : ""}`}>{content}</p>;
      },
    },
    {
      field: "messages.output",
      headerName: "Output",
      width: 170,
      flex: 0.5,
      valueGetter: ({ row }) => row.message.output.content,
      renderCell: ({ row }) => {
        const { content } = row.message.output;
        const { isDeleted } = row.message;
        return <p className={`${isDeleted ? "text-error" : ""}`}>{content}</p>;
      },
    },
    {
      field: "isLiked",
      headerName: "Feedback",
      width: 95,
      valueGetter: ({ row }) => row.message.isLiked,
      renderCell: ({ row }) => {
        const { isLiked } = row.message;
        return <Rating value={isLiked} />;
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
