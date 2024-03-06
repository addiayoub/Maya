import { IconButton } from "@mui/material";
import moment from "moment";
import { Edit, Eye, Trash } from "react-feather";
import { Rating } from "../../components/Helpers";
import { hostName } from "../../api/config";
export const getColumns = (actionsHandler) => {
  return [
    {
      field: "profile",
      headerName: "Profile",
      renderCell: ({ row }) => {
        return <Profile img={row.image} />;
      },
    },
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

const Profile = ({ img }) => {
  return (
    <div className="w-[35px] h-[35px] rounded-[50%] overflow-hidden">
      <img
        src={`${hostName}/images/${img}`}
        alt="user-profile"
        className="h-full w-full object-cover m-auto"
      />
    </div>
  );
};
