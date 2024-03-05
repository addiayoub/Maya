import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/UserActions";
import Table from "../../components/Table";
import { getColumns } from "./columns";
import { Box, Button, Typography } from "@mui/material";
import { Mail, MessageCircle, Plus, User } from "react-feather";
import Create from "./CRUD/Create";
import Delete from "./CRUD/Delete";
import Update from "./CRUD/Update";
import UserDetails from "./CRUD/UserDetails";
import MessagesTable from "./MessagesTable";

const Index = () => {
  const {
    users: { data, loading, error },
  } = useSelector((state) => state.user);
  console.log("index users", data);
  const [modals, setModals] = useState({
    create: { state: false, payload: null },
    delete: { state: false, payload: null },
    update: { state: false, payload: null },
    show: { state: false, payload: null },
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const handleModals = (name, value = { state: false, payload: null }) => {
    setModals((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const columns = getColumns(handleModals);
  return (
    <Box>
      <Button
        variant="contained"
        size="small"
        onClick={() => handleModals("create", { state: true, payload: null })}
      >
        Ajouter un utilisateur <Plus color="white" />
      </Button>
      <Table rows={data} columns={columns} pageSize={25} />
      {modals.create.state && (
        <Create
          open={modals.create.state}
          setModalOff={() => handleModals("create")}
        />
      )}
      <MessagesTable />
      {modals.delete.state && (
        <Delete
          data={modals.delete}
          setModalOff={() => handleModals("delete")}
        />
      )}
      {modals.update.state && (
        <Update
          data={modals.update}
          setModalOff={() => handleModals("update")}
        />
      )}
      {modals.show.state && (
        <UserDetails
          data={modals.show}
          setModalOff={() => handleModals("show")}
        />
      )}
      {/* {data.map((item) => {
        return (
          <p key={item._id}>
            {item.username} - {item.isAdmin ? "Admin" : "User"} - Chats:
            {item.chats.length}- Deleted Chats :
            {item.chats.filter((chat) => chat.isDeleted).length}- Deleted
            messages: {countDeletedMessages(item)}
          </p>
        );
      })} */}
    </Box>
  );
};

export default Index;
