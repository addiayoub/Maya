import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../../redux/slices/AuthSlice";
import { updateProfile, upload } from "../../redux/actions/UserActions";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [username, setUsername] = useState(user.username);
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUsername(username));
    let formData = new FormData();
    formData.append("file", file);
    formData.append("name", "Yuns");
    console.log("file", file, formData);
    const user = { username, password, passwordConfirmation, file };
    dispatch(updateProfile({ user: { file } }));
  };
  const handleUpload = () => {
    dispatch(upload({ file }));
  };
  return (
    <div>
      <h3>Profile - {user.username}</h3>
      {/* <input
        type="file"
        name="file"
        // value={file}
        onChange={(e) => setFile(e.target.files[0])}
      /> */}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Nom d'utilisateur"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mot de passe"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          password
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Confirmation de mot de passe"
          type="password"
          id="password-confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          password
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          // disabled={loading}
        >
          Modifier
        </Button>
      </Box>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Profile;
