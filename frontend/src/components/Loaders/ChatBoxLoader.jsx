import { Skeleton, Stack } from "@mui/material";
import React from "react";

const ChatBoxLoader = () => {
  return (
    <div className="w-full overflow-y-auto">
      <div className="px-4 py-2 justify-center text-base md:gap-6 m-auto">
        <Stack
          className="my-[20px] mx-auto"
          spacing={2}
          sx={{
            width: "calc(100%-300px)",
          }}
        >
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton
                variant="text"
                width={100}
                height={30}
                sx={{ fontSize: "1rem" }}
              />
            </Stack>
            <Skeleton
              variant="text"
              sx={{
                maxWidth: 320,
                width: "100%",
              }}
              height={20}
            />
            <Skeleton variant="rounded" height={70} />
            <Skeleton variant="rounded" height={70} />
          </Stack>
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton
                variant="text"
                width={100}
                height={30}
                sx={{ fontSize: "1rem" }}
              />
            </Stack>
            <Skeleton
              variant="text"
              sx={{
                maxWidth: 320,
                width: "100%",
              }}
              height={20}
            />
            <Skeleton variant="rounded" height={70} />
            <Skeleton variant="rounded" height={70} />
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default ChatBoxLoader;
