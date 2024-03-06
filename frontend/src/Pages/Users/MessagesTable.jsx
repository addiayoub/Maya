import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../components/Table";
import { getMsgsColumns } from "./columns";
import { transformUsersData } from "../../utils/admin";
import ChatPreview from "./ChatPreview";

const MessagesTable = () => {
  const {
    users: { data, loading, error },
  } = useSelector((state) => state.user);
  const [open, setOpen] = useState({
    state: false,
    payload: null,
  });
  console.log("open", open);
  console.log("data is", data);
  const rows = useMemo(() => transformUsersData(data), [data]);
  console.log("rows", rows);
  const columns = useMemo(() => getMsgsColumns(setOpen), [data]);
  const handleClose = () => setOpen({ state: false, payload: null });
  return (
    <div className="">
      <h3>Messages Table</h3>
      <Table rows={rows} columns={columns} pageSize={100} />
      <ChatPreview open={open} handleClose={handleClose} />
    </div>
  );
};

export default MessagesTable;
