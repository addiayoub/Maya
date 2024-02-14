import React, { memo, useMemo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import { Box } from "@mui/material";
import {
  defaultOptions,
  getFullscreenFeature,
} from "../../utils/Chart/defaultOptions";
import { formatNumberWithSpaces } from "../../utils/Format/formatNumberWithSpaces";
import moment from "moment";

const zoomOpts = [
  {
    type: "inside",
    start: 0,
    end: 100,
  },
  {
    show: true,
    type: "slider",
    start: 0,
    end: 100,
  },
];

const getSeries = (data, seriesNames) => {
  return seriesNames.map((seriesName) => ({
    name: seriesName,
    type: "bar",
    data: data.map((item) => item[seriesName]),
  }));
};

const BarChart = ({ data, style, SN, formatDate }) => {
  const chart = useRef(null);
  const myFullscreen = getFullscreenFeature(chart);
  console.log("render BarChart");
  const zoom = { dataZoom: zoomOpts };

  const {
    toolbox: {
      feature: {
        saveAsImage,
        magicType,
        dataZoom: zoomFeat,
        restore,
        dataView,
      },
    },
  } = defaultOptions;
  const dateKey = Object.keys(data[0])[0];
  const seances = useMemo(
    () =>
      data.map((item) =>
        formatDate ? moment(item[dateKey]).format("DD/MM/YYYY") : item[dateKey]
      ),
    [data]
  );
  const seriesNames =
    SN ?? Object.keys(data[0]).filter((item) => item !== dateKey);
  const series = useMemo(() => getSeries(data, seriesNames));
  const baseOptions = useMemo(() => {
    const yAxisValues = data.flatMap((item) =>
      Object.values(item).filter((value, index) => index !== 0)
    );
    const hasMillions = yAxisValues.some((value) => value >= 1000000);
    console.log(
      "hasMill",
      hasMillions,
      yAxisValues,
      Math.trunc(Math.min(...yAxisValues))
    );
    return {
      title: {},
      legend: {
        orient: "horizontal",
        zLevel: 23,
        width: "70%",
        bottom: "10%",
        type: "scroll",
        left: "center",
        textStyle: {
          width: 150,
          rich: {
            fw600: {
              fontWeight: 600,
            },
          },
        },
      },
      xAxis: {
        type: "category",
        data: seances,
        axisLabel: {
          hideOverlap: true,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: [
        {
          type: "value",
          min: Math.trunc(Math.min(...yAxisValues)),
          axisLabel: {
            hideOverlap: true,
            formatter: (value) => {
              // Format yAxis labels as millions only when there are millions in the data
              return hasMillions ? `${value / 1000000} M` : value;
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      grid: {
        right: "100px",
        bottom: "17%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        textStyle: {
          overflow: "breakAll",
          width: 40,
        },
        confine: true,
        // valueFormatter: (value) => formatNumberWithSpaces(value),
        valueFormatter: (value) => {
          const val = hasMillions ? value / 1000000 : value;
          return formatNumberWithSpaces(val) + `${hasMillions ? " M" : ""}`;
        },
      },
      toolbox: {
        feature: {
          myFullscreen,
          magicType,
          dataZoom: zoomFeat,
          restore,
          saveAsImage,
          dataView,
        },
        top: "20px",
      },
      series,
      ...zoom,
    };
  }, [series]);

  return (
    <Box className="relative w-full">
      <ReactECharts
        option={baseOptions}
        key={JSON.stringify(baseOptions)}
        style={{
          minHeight: 400,
          ...style,
        }}
        ref={chart}
      />
    </Box>
  );
};

export default memo(BarChart);
