import React, { memo } from "react";
import { Skeleton } from "@mui/material";

const SidebarLoader = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        height={40}
        className="rounded-lg cursor-pointer m-[10px]"
      />
      <Skeleton
        variant="rectangular"
        height={40}
        className="rounded-lg cursor-pointer m-[10px]"
      />
      <Skeleton
        variant="rectangular"
        height={40}
        className="rounded-lg cursor-pointer m-[10px]"
      />
    </>
  );
};

export default memo(SidebarLoader);
