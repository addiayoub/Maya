import React from "react";
import { memo } from "react";
import { Edit, Trash } from "react-feather";

const DropDownMenu = ({ id, title, handleEditClick, handleDeleteChat }) => {
  return (
    <div className="py-3.5 px-2.5 flex flex-col gap-4 text-sm ">
      <div
        className="flex flex-wrap gap-3 hover:bg-gray-100 rounded-md p-2.5"
        onClick={(e) => {
          e.stopPropagation();
          console.log("div clicked");
          handleEditClick(id, title);
        }}
      >
        <Edit
          color="var(--primary-color)"
          size={16}
          onClick={(e) => {
            e.stopPropagation();
            console.log("div clicked");
            // handleEditClick(id, title);
          }}
        />
        <span>Renommer</span>
      </div>

      <div
        className="flex flex-wrap gap-3 hover:bg-gray-100 rounded-md p-2.5"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteChat(id);
        }}
      >
        <Trash color="var(--error-color)" size={16} />
        <span className="text-error">Supprimer</span>
      </div>
    </div>
  );
};
export default memo(DropDownMenu);
