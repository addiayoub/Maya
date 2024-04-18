import React, { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../components/Table";
import { transformUsersData } from "../../utils/admin";
import ChatPreview from "./ChatPreview";
import { getMsgsColumns } from "./columns";
import Accordion from "../../components/Ui/Accordion";

const MessagesTable = () => {
  const {
    users: { data },
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
    <Accordion className="my-4" title="Messages Table" isExpanded>
      <Table rows={rows} columns={columns} pageSize={100} />
      <ChatPreview open={open} handleClose={handleClose} />
    </Accordion>
  );
};

export default memo(MessagesTable);
