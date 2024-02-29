import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/UserActions";
import Table from "../../components/Table";
import { getColumns } from "./columns";
import { Button } from "@mui/material";
import { Plus } from "react-feather";
import Create from "./CRUD/Create";
import DeleteModal from "../../components/Ui/DeleteModal";
import ModalComponent from "../../components/Ui/ModalComponent";
import Delete from "./CRUD/Delete";
import Update from "./CRUD/Update";
const Index = () => {
  const {
    users: { data, loading, error },
  } = useSelector((state) => state.user);
  console.log("index users", data);
  const [modals, setModals] = useState({
    create: { state: false, payload: null },
    delete: { state: false, payload: null },
    update: { state: false, payload: null },
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
    <>
      <h3>Users Route</h3>
      <Button
        variant="contained"
        size="small"
        onClick={() => handleModals("create", { state: true, payload: null })}
      >
        Ajouter un utilisateur <Plus color="white" />
      </Button>
      <Table rows={data} columns={columns} />
      {modals.create.state && (
        <Create
          open={modals.create.state}
          setModalOff={() => handleModals("create")}
        />
      )}
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
      {data.map((item) => {
        return (
          <p key={item._id}>
            {item.username} - {item.isAdmin ? "Admin" : "User"} - Chats:{" "}
            {item.chats.length}
          </p>
        );
      })}
    </>
  );
};

export default Index;
