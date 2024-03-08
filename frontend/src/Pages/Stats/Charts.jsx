import React, { memo } from "react";
import { defaultOptions } from "../../utils/Chart/defaultOptions";
import ReactECharts from "echarts-for-react";
export const PieChart = ({ data, title }) => {
  const option = {
    title: {
      text: title,
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: "50%",
        data: data.map((item) => ({
          name: item.username,
          value: item.count,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "500px", width: "100%" }} />
  );
};
export const LineChart = ({ data }) => {
  const {
    dataZoom: zoom,
    toolbox: {
      feature: { saveAsImage, dataZoom, restore },
    },
  } = defaultOptions;
  const option = {
    title: {
      text: "Messages Reactions",
      x: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Neutre", "Like", "Dislike"],
      top: 30,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.username),
      axisLabel: {
        hideOverlap: true,
      },
    },
    yAxis: {
      type: "value",
      min: "dataMin",
      axisLabel: {
        hideOverlap: true,
      },
      splitLine: {
        show: false,
      },
    },
    toolbox: {
      feature: {
        saveAsImage,
        dataZoom,
        restore,
      },
      top: "20px",
    },
    series: [
      {
        name: "Neutre",
        type: "line",
        data: data.map((item) => item.nullCount),
      },
      {
        name: "Like",
        type: "line",
        data: data.map((item) => item.likeCount),
      },
      {
        name: "Dislike",
        type: "line",
        data: data.map((item) => item.dislikeCount),
      },
    ],
    dataZoom: zoom,
  };

  return (
    <ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
  );
};
