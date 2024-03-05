import { IconButton } from "@mui/material";
import moment from "moment";
import { Edit, Eye, Trash } from "react-feather";
import { Rating } from "../../components/Helpers";
export const getColumns = (actionsHandler) => {
  return [
    {
      field: "username",
      headerName: "Nom d'utilisateur",
      width: 360,
      flex: 1,
    },
    {
      field: "isAdmin",
      headerName: "Rôle",
      width: 360,
      flex: 0.5,
      renderCell: (params) => {
        const role = params.value ? "admin" : "user";
        return <span>{role}</span>;
      },
    },
    {
      field: "chats",
      headerName: "Chats",
      width: 360,
      flex: 0.3,
      valueGetter: (params) => params.row.chats.length,
      renderCell: (params) => params.row.chats.length,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 320,
      flex: 0.5,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <div>
            <IconButton
              variant="contained"
              size="small"
              sx={{ marginInline: 0.3 }}
              onClick={() => {
                console.log("show row", row);
                actionsHandler("show", { state: true, payload: row });
              }}
            >
              <Eye size="20" color="var(--primary-color)" />
            </IconButton>
            <IconButton
              variant="contained"
              size="small"
              sx={{ marginInline: 0.3 }}
              onClick={() => {
                actionsHandler("delete", { state: true, payload: row._id });
              }}
            >
              <Trash size="20" color="var(--error-color)" />
            </IconButton>
            <IconButton
              variant="contained"
              size="small"
              onClick={() => {
                console.log("row", row);
                const { isAdmin, username, _id } = row;
                actionsHandler("update", {
                  state: true,
                  payload: { id: _id, username, isAdmin },
                });
              }}
            >
              <Edit size="20" color="var(--primary-color)" />
            </IconButton>
          </div>
        );
      },
    },
  ];
};

export const getMsgsColumns = (handler) => {
  return [
    { field: "username", headerName: "Nom d'utilisateur", width: 170 },
    {
      field: "chat",
      headerName: "Chat Title",
      width: 150,
      valueGetter: ({ row }) => row.chat.title,
      renderCell: ({ row }) => {
        console.log("row", row);
        return (
          <p className={`${row.chat.isDeleted ? "text-error" : ""}`}>
            {row.chat.title}
          </p>
        );
      },
    },
    {
      field: "message",
      headerName: "Message Source",
      width: 150,
      valueGetter: ({ row }) => (row.message.isUser ? "Input" : "Output"),
      renderCell: ({ row }) => {
        console.log("row", row);
        const { isUser, isLiked } = row.message;
        const res = (
          <div className="w-full cursor-pointer">
            <span
              className={`block rounded-lg ${
                isUser ? "bg-emerald-200" : "bg-sky-200"
              } max-w-[60px] text-center p-1`}
            >
              {isUser ? "Input" : "Output"}
            </span>
          </div>
        );
        return res;
      },
    },
    {
      field: "messages",
      headerName: "Message Content",
      width: 200,
      flex: 1,
      valueGetter: ({ row }) => row.message.content,
      renderCell: ({ row }) => {
        const { content, isDeleted } = row.message;
        return <p className={`${isDeleted ? "text-error" : ""}`}>{content}</p>;
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
      field: "isLiked",
      headerName: "Feedback",
      width: 100,
      valueGetter: ({ row }) => row.message.isLiked,
      renderCell: ({ row }) => {
        const { isLiked } = row.message;
        return <Rating value={isLiked} />;
      },
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 80,
      valueGetter: ({ row }) => row.message.content,
      renderCell: ({ row }) => {
        return (
          <Eye
            className="cursor-pointer text-primary"
            size={20}
            onClick={() =>
              handler({
                state: true,
                payload: {
                  isUser: row.message.isUser,
                  chat: row.chat,
                  message: row.message,
                },
              })
            }
          />
        );
      },
    },
  ];
};
