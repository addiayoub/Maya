import { Box, TextField, Button, FormLabel } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ToggleButtons from "../../../components/Ui/ToggleButtons";
import ModalComponent from "../../../components/Ui/ModalComponent";
import EndAdorment from "../../../components/Ui/EndAdorment";
import { buttons } from "./commun";
import { createUser } from "../../../redux/actions/UserActions";
import { notyf } from "../../../utils/notyf";
import { addUser } from "../../../redux/slices/UserSlice";

const style = {
  width: "100%",
  maxWidth: "400px",
  boxShadow: 24,
  padding: 20,
  borderRadius: "20px",
};

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
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfir, setVisiblePasswordConfir] = useState(false);
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
      <Box component="form" style={{ ...style }}>
        <Box>
          <TextField
            label="Nom d'utilisateur"
            id="username-field"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            {...((error?.usernamePassword || error?.username) && {
              error: true,
              helperText: error.usernamePassword || error?.username,
            })}
          />
          <br /> <br />
          <TextField
            id="password-field"
            type={visiblePassword ? "text" : "password"}
            {...((error?.usernamePassword || error?.password) && {
              error: true,
            })}
            label="Mot de pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <EndAdorment
                  visible={visiblePassword}
                  setVisible={setVisiblePassword}
                />
              ),
            }}
          />
          <br />
          <br />
          <TextField
            id="password-confirmation-field"
            type={visiblePasswordConfir ? "text" : "password"}
            label="Confirmation de mot de pass"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            variant="outlined"
            fullWidth
            {...((error?.usernamePassword || error?.password) && {
              error: true,
              helperText: error?.password || null,
            })}
            InputProps={{
              endAdornment: (
                <EndAdorment
                  visible={visiblePasswordConfir}
                  setVisible={setVisiblePasswordConfir}
                />
              ),
            }}
          />
          <br /> <br />
          <Box className="flex flex-wrap items-center gap-[10px]">
            <FormLabel id="radio-buttons-group-label">
              Sélectionnez le rôle :
            </FormLabel>
            {buttons.map(({ label, text, values }) => {
              return (
                <ToggleButtons
                  key={label}
                  buttons={values}
                  init={isAdmin}
                  label={label}
                  onButtonsChange={(label, newValue) =>
                    setIsAdmin(newValue ?? false)
                  }
                />
              );
            })}
          </Box>
          <br />
          <br />
          <Button
            onClick={handleCreate}
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            disabled={disabled}
          >
            {isLoading ? "Veuillez patienter..." : "Ajouter"}
          </Button>
        </Box>
      </Box>
    </ModalComponent>
  );
}
