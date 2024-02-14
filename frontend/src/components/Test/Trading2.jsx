import React from "react";
import data from "./tradingData.json";
import ReactECharts from "echarts-for-react";
const Trading2 = () => {
  const seriesData = data.map((item) => [
    new Date().getTime(), // Assuming you have a timestamp property in your data
    item.Open,
    item.Close,
    item.Low,
    item.High,
  ]);
  const options = {
    xAxis: {
      type: "category",
      data: data.map((item) => item.Timestamp),
    },
    yAxis: {
      scale: true,
    },
    series: [
      {
        type: "candlestick",
        data: seriesData,
        itemStyle: {
          color: "green", // Color for rising candles
          color0: "red", // Color for falling candles
          borderColor: null,
          borderColor0: null,
        },
      },
    ],
  };
  return (
    <ReactECharts
      option={options}
      style={{
        height: "600px",
        width: "600px",
      }}
    />
  );
};

export default Trading2;
