import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser } from "../../redux/slices/AuthSlice";
import { updateProfile } from "../../redux/actions/UserActions";
import { notyf } from "../../utils/notyf";
import { FileUploader } from "react-drag-drop-files";
import EndAdorment from "../Ui/EndAdorment";
import { hostName } from "../../api/config";
const fileTypes = ["png", "jpeg", "jpg", "webp"];
const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [preview, setPreview] = useState(`${hostName}/images/${user.image}`);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("file", file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }, [file]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const user = { username, password, passwordConfirmation, pic: file };
    dispatch(updateProfile({ user }))
      .unwrap()
      .then(({ message, user }) => {
        console.log("Update Success", user);
        dispatch(updateCurrentUser(user));
        notyf.success(message);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => setLoading(false));
  };
  return (
    <Box className="overflow-y-auto">
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col flex-wrap gap-[12px] mt-4"
      >
        <TextField
          required
          fullWidth
          id="username"
          label="Nom d'utilisateur"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          {...((error?.usernamePassword || error?.username) && {
            error: true,
            helperText: error.usernamePassword || error?.username,
          })}
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Mot de passe"
          type={showPw ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <EndAdorment visible={showPw} setVisible={setShowPw} />
            ),
          }}
          {...((error?.usernamePassword || error?.password) && {
            error: true,
          })}
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Confirmation de mot de passe"
          type={showConfirmPw ? "text" : "password"}
          id="password-confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          InputProps={{
            endAdornment: (
              <EndAdorment
                visible={showConfirmPw}
                setVisible={setShowConfirmPw}
              />
            ),
          }}
          {...((error?.usernamePassword || error?.password) && {
            error: true,
            helperText: error?.password || null,
          })}
        />
        <Box className="flex w-full gap-[10px] tablet:flex-col phone:flex-col">
          <FileUploader
            handleChange={(f) => setFile(f)}
            name="file"
            types={fileTypes}
            label="Importer"
            fileOrFiles={file}
            dropMessageStyle={{ backgroundColor: "blue" }}
            onTypeError={(error) => {
              console.log("error", error);
              notyf.options.duration = 3500;
              notyf.error(
                "Type de fichier non valide. Veuillez sélectionner un fichier PNG, JPEG ou JPG."
              );
            }}
          />
          {preview && (
            <Box className="flex flex-col flex-[0.5] gap-[15px] border-[1.5px] border-dashed border-muted p-4 max-h-[310px] divide-y divide-slate-200">
              <Box className="mb-2">
                <Typography className="mb-2 select-none font-semibold">
                  Image Preview
                </Typography>
                <Divider />
              </Box>
              <img
                src={preview}
                alt="profile-pic-preview"
                className="select-none m-auto max-w-[200px] max-h-[200px] w-[200px] h-[200px] rounded-full"
              />
            </Box>
          )}
        </Box>
        <Button type="submit" fullWidth variant="contained" disabled={loading}>
          {loading ? "Veuillez patienter..." : "Modifier"}
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
