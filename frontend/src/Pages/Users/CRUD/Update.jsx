import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import ModalComponent from "../../../components/Ui/ModalComponent";
import { updateUser as updateUserAction } from "../../../redux/actions/UserActions";
import { notyf } from "../../../utils/notyf";
import { updateUser } from "../../../redux/slices/UserSlice";
import Form from "./Form";
import CustomButton from "../../../components/Ui/Buttons";
import { Edit } from "react-feather";

const modalStyle = {
  width: "100%",
  maxWidth: "400px",
};

function Update({ data, setModalOff }) {
  const { state, payload } = data;
  console.log("update data", data);
  const [username, setUsername] = useState(payload.username);
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(payload.isAdmin);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const dispatch = useDispatch();
  const handleUpdate = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
      passwordConfirmation,
      isAdmin,
    };
    setError(null);
    setIsLoading(true);

    console.log("User", user);
    dispatch(updateUserAction({ id: payload.id, user }))
      .unwrap()
      .then((resp) => {
        console.log("resp", resp);
        dispatch(updateUser({ id: payload.id, username, isAdmin }));
        setModalOff();
        notyf.success(resp.message);
      })
      .catch((error) => {
        console.log("Error", error);
        if (error?.failed) {
          notyf.error(error.message);
        }
        setError(error);
      })
      .finally(() => setIsLoading(false));
  };
  const disabled = isLoading || !username;
  return (
    <ModalComponent
      open={state}
      handleClose={setModalOff}
      style={modalStyle}
      withHeader
      headerText="Modifier"
    >
      <Form
        {...{
          handelSubmit: handleUpdate,
          username,
          setUsername,
          password,
          setPassword,
          passwordConfirmation,
          setPasswordConfirmation,
          isAdmin,
          setIsAdmin,
          error,
        }}
        submitBtn={
          <CustomButton
            onClick={handleUpdate}
            disabled={disabled}
            text={isLoading ? "Veuillez patienter..." : "Modifier"}
            icon={isLoading ? null : <Edit size={18} />}
          />
        }
      />
    </ModalComponent>
  );
}
export default memo(Update);
