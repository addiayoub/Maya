import React, { memo } from "react";
import ModalComponent from "../../../components/Ui/ModalComponent";
import DeleteModal from "../../../components/Ui/DeleteModal";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/slices/UserSlice";
import { deleteUser as deleteUserAction } from "../../../redux/actions/UserActions";
import { notyf } from "../../../utils/notyf";

const Delete = ({ data, setModalOff }) => {
  const { state, payload } = data;
  const dispatch = useDispatch();
  const handleDeleteConfirmation = (confirm) => {
    console.log("confir", confirm);
    if (confirm) {
      console.log(payload);
      dispatch(deleteUserAction(payload))
        .unwrap()
        .then((resp) => {
          console.log("resp", resp);
          notyf.success(resp.message);
          dispatch(deleteUser(payload));
        })
        .catch((error) => {
          notyf.error(error);
        });
    }
    setModalOff();
  };
  return (
    <ModalComponent open={state} handleClose={setModalOff}>
      <DeleteModal {...{ handleDeleteConfirmation }} />
    </ModalComponent>
  );
};

export default memo(Delete);
