import { IconButton } from "@mui/material";
import { Edit, Trash } from "react-feather";
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
