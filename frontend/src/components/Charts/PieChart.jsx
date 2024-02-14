import React, { memo, useMemo, useRef } from "react";
import { Box } from "@mui/material";
import ReactECharts from "echarts-for-react";
import {
  defaultOptions,
  getFullscreenFeature,
} from "../../utils/Chart/defaultOptions";

const initSaveToExcel = {
  show: false,
  data: [],
  fileName: new Date().getTime(),
};

const PieChart = ({ options, style }) => {
  console.log("options", options, saveToExcel);
  const chart = useRef(null);
  const myFullscreen = getFullscreenFeature(chart);
  const theme = useChartTheme();
  console.log("render LineChart");
  const {
    title,
    grid,
    tooltip,
    series,
    legend,
    seriesNames: { seriesList = [], init = [] } = {},
    ...rest
  } = options;
  const {
    toolbox: {
      feature: { saveAsImage, dataView, restore },
    },
  } = defaultOptions;
  const baseOptions = useMemo(() => {
    return {
      title: {
        ...(title ?? {}),
      },
      legend: {
        orient: "horizontal",
        zLevel: 23,
        width: "70%",
        type: "scroll",
        left: "center",
        bottom: "0",
        textStyle: {
          width: 150,
          rich: {
            fw600: {
              fontWeight: 600,
            },
          },
        },
        ...(legend ?? {}),
      },
      grid: {
        bottom: "10%",
        containLabel: true,
        ...(grid ?? {}),
      },
      tooltip: {
        trigger: "item",
        textStyle: {
          overflow: "breakAll",
          width: 40,
        },
        confine: true,
        valueFormatter: (value) => value?.toFixed(2) + "%",
        ...(tooltip ?? {}),
      },
      toolbox: {
        feature: {
          myFullscreen,
          restore,
          saveAsImage,
          dataView,
        },
        top: "20px",
      },
      series,
      ...rest,
    };
  }, [series, options]);

  return (
    <Box className="relative w-full">
      <ReactECharts
        option={baseOptions}
        key={JSON.stringify(baseOptions)}
        style={style}
        ref={chart}
      />
    </Box>
  );
};

export default memo(PieChart);
