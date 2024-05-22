import React, { memo } from "react";
import { makeStyles, styled } from "@mui/styles";
import { Select, InputLabel, FormControl, MenuItem } from "@mui/material";
import ENG from "../assets/images/united-kingdom-flag-icon.svg";
import AR from "../assets/images/saudi-arabia-flag-icon.svg";
import FR from "../assets/images/france-flag-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../redux/slices/LayoutSlice";

const countries = [
  {
    label: "France",
    src: FR,
    link: " ",
    value: "fr",
  },
  {
    label: "Arabe",
    src: AR,
    link: " ",
    value: "ar",
  },
  {
    label: "English",
    src: ENG,
    link: " ",
    value: "eng",
  },
];
const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(1),
  },
  formControl: {
    backgroundColor: "transparent",
  },
  select: {
    textAlign: "center",
    textDecoration: "none",
  },
}));

function Languages() {
  const classes = useStyles();
  const { lang } = useSelector((state) => state.layout);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(setLang(event.target.value));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <form autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="open-select" />
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={lang}
          name="lang"
          onChange={handleChange}
          inputProps={{
            id: "open-select",
          }}
        >
          {countries.map((option, key) => (
            <MenuItem value={option.value} key={key}>
              <img src={option.src} alt={option.label} />{" "}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}

export default memo(Languages);
