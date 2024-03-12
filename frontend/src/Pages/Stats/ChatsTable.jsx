import React, { memo } from "react";
import { useSelector } from "react-redux";
import Table from "../../components/Table";
import { transformDataChats } from "../../utils/admin";
import { chatsColumns } from "./columns";
import Accordion from "../../components/Ui/Accordion";

const ChatsTable = () => {
  const {
    users: { data },
  } = useSelector((state) => state.user);
  const rows = transformDataChats(data);
  return (
    <Accordion title="Chats table">
      <Table columns={chatsColumns} rows={rows} pageSize={25} />
    </Accordion>
  );
};

export default memo(ChatsTable);
