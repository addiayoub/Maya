import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ModalComponent from "../../../components/Ui/ModalComponent";
import { createUser } from "../../../redux/actions/UserActions";
import { notyf } from "../../../utils/notyf";
import { addUser } from "../../../redux/slices/UserSlice";
import Form from "./Form";
import CustomButton from "../../../components/Ui/Buttons";
import { UserPlus } from "react-feather";

const modalStyle = {
  width: "100%",
  maxWidth: "400px",
};

export default function Create({ open, setModalOff }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const handleCreate = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
      passwordConfirmation,
      isAdmin,
    };
    console.log("User", user);
    setIsLoading(true);
    setError(null);
    dispatch(createUser(user))
      .unwrap()
      .then((resp) => {
        console.log("resp", resp);
        dispatch(addUser(resp.user));
        setModalOff();
        notyf.success(resp.message);
      })
      .catch((error) => {
        if (error?.failed) {
          notyf.error(error.message);
        }
        setError(error);
      })
      .finally(() => setIsLoading(false));
  };
  const disabled = isLoading || !username || !password || !passwordConfirmation;
  return (
    <ModalComponent
      open={open}
      handleClose={setModalOff}
      style={modalStyle}
      withHeader
      headerText="Ajouter un utilisateur"
    >
      <Form
        {...{
          handelSubmit: handleCreate,
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
            onClick={handleCreate}
            type="submit"
            disabled={disabled}
            text={isLoading ? "Veuillez patienter..." : "Ajouter"}
            icon={isLoading ? null : <UserPlus size={18} />}
          />
        }
      />
    </ModalComponent>
  );
}
