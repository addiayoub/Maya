import React, { memo, useMemo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import {
  defaultOptions,
  getFullscreenFeature,
} from "../../utils/Chart/defaultOptions";
import { Box } from "@mui/material";

const initSaveToExcel = {
  show: false,
  data: [],
  fileName: new Date().getTime(),
};

const TradingChart = ({ options, style, showSeriesSelector }) => {
  console.log("options", options);
  const chart = useRef(null);
  const myFullscreen = getFullscreenFeature(chart);
  console.log("render TradingChart");
  const {
    title,
    grid,
    tooltip,
    xAxis,
    series,
    yAxis,
    legend,
    seriesNames: { seriesList = [], init = seriesList } = {},
    ...rest
  } = options;
  const {
    dataZoom: zoom,
    toolbox: {
      feature: { saveAsImage, dataZoom, restore },
    },
  } = defaultOptions;
  const baseOptions = useMemo(() => {
    return {
      title: {
        ...(title ?? {}),
      },
      xAxis: {
        ...(xAxis ?? {}),
        axisLabel: {
          hideOverlap: true,
        },
        min: "dataMin",
        max: "dataMax",
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
      },
      yAxis: {
        ...(yAxis ?? {}),
        axisLabel: {
          hideOverlap: true,
        },
        scale: true,
        splitArea: {
          show: true,
        },
      },
      legend: {
        orient: "horizontal",
        zLevel: 23,
        width: "70%",
        bottom: "9%",
        type: "scroll",
        textStyle: {
          width: 150,
          rich: {
            fw600: {
              fontWeight: 600,
            },
          },
        },
        // selected: selectedLegend,
        ...(legend ?? {}),
      },
      grid: {
        right: "100px",
        top: "10%",
        bottom: "15%",
        containLabel: true,
        ...(grid ?? {}),
      },
      tooltip: {
        axisPointer: {
          type: "cross",
        },
        trigger: "axis",
        textStyle: {
          overflow: "breakAll",
          width: 40,
        },
        confine: true,
        // valueFormatter: (value) => value?.toFixed(2),
        ...(tooltip ?? {}),
      },
      toolbox: {
        feature: {
          myFullscreen,
          saveAsImage,
          dataZoom,
          restore,
        },
        top: "20px",
      },
      zoom,
      series,
      ...rest,
    };
  }, [series, options]);

  return (
    <Box className="relative">
      <ReactECharts
        option={baseOptions}
        key={JSON.stringify(baseOptions)}
        style={{
          minHeight: "500px",
          ...style,
        }}
        ref={chart}
      />
    </Box>
  );
};

export default memo(TradingChart);
