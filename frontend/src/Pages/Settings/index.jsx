import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConfig, setConfig } from "../../redux/actions/UserActions";
import MainLoader from "../../components/Loaders/MainLoader";
import Accordion from "../../components/Ui/Accordion";
import { TextField } from "@mui/material";
import CustomButton from "../../components/Ui/Buttons";
import { Edit } from "react-feather";
import { notyf } from "../../utils/notyf";

const Settings = () => {
  const {
    config: { loading, apiAddress },
  } = useSelector((state) => state.user);
  const [api, setApi] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConfig())
      .then(() => {
        setApi(apiAddress);
      })
      .catch((error) => {
        console.error("Error getConfig:", error);
      });
  }, [dispatch, apiAddress]);
  const handleUpdate = () => {
    dispatch(setConfig({ apiAddress: api }))
      .unwrap()
      .then(({ message }) => {
        console.log("res");
        notyf.success(message);
      })
      .catch((error) => {
        notyf.error(error);
        console.error("Error Update Config:", error);
      });
  };
  const isDisabled = loading || !api;
  return (
    <Accordion title="paramètres" isExpanded>
      {loading && <MainLoader />}
      <TextField
        label="L'adresse API:"
        value={api}
        onChange={(e) => setApi(e.target.value)}
        size="small"
        className="w-full max-w-[250px]"
        autoFocus={true}
      />
      <CustomButton
        className="my-2"
        text="Modifier"
        disabled={isDisabled}
        onClick={handleUpdate}
        icon={<Edit size={18} />}
      />
    </Accordion>
  );
};

export default memo(Settings);
