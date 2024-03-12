import React, { useMemo, memo } from "react";
import data from "./tradingData.json";
import ReactECharts from "echarts-for-react";
import {
  calculateMA,
  candelChartTransformData,
} from "../../utils/Chart/candelChartTransformData";
import {
  downBorderColor,
  downColor,
  upBorderColor,
  upColor,
} from "../../utils/Chart/defaultOptions";

const CandelsVolume = () => {
  const data0 = candelChartTransformData(
    data,
    "Date",
    "Open",
    "Close",
    "Low",
    "High"
  );
  const minValues = useMemo(
    () => data.map((item) => item.LowerBand.toFixed(2)),
    [data]
  );
  const maxValues = useMemo(
    () => data.map((item) => item.UpperBand.toFixed(2)),
    [data]
  );
  const rangeValues = Array.from({ length: minValues.length }, (_, index) =>
    Math.abs(maxValues[index] - minValues[index])
  );
  const options = {
    animation: false,
    legend: {
      bottom: 10,
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      textStyle: {
        color: "#000",
      },
      position: function (pos, params, el, elRect, size) {
        const obj = {
          top: 10,
        };
        obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      },
      // extraCssText: 'width: 170px'
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: "all",
        },
      ],
      label: {
        backgroundColor: "#777",
      },
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: false,
        },
        brush: {
          type: ["lineX", "clear"],
        },
      },
    },
    brush: {
      xAxisIndex: "all",
      brushLink: "all",
      outOfBrush: {
        colorAlpha: 0.1,
      },
    },
    visualMap: {
      show: false,
      seriesIndex: 5,
      dimension: 2,
      pieces: [
        {
          value: 1,
          color: downColor,
        },
        {
          value: -1,
          color: upColor,
        },
      ],
    },
    grid: [
      {
        left: "10%",
        right: "8%",
        height: "50%",
      },
      {
        left: "10%",
        right: "8%",
        top: "63%",
        height: "16%",
      },
    ],
    xAxis: [
      {
        type: "category",
        data: data0.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: "dataMin",
        max: "dataMax",
        axisPointer: {
          z: 100,
        },
      },
      {
        type: "category",
        gridIndex: 1,
        data: data0.categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: "dataMin",
        max: "dataMax",
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0, 1],
        start: 98,
        end: 100,
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: "slider",
        top: "85%",
        start: 98,
        end: 100,
      },
    ],
    series: [
      {
        name: "optimum",
        type: "candlestick",
        data: data0.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: undefined,
          borderColor0: undefined,
        },
      },
      {
        name: "MA5",
        type: "line",
        data: calculateMA(5, data0),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: "MA20",
        type: "line",
        data: calculateMA(20, data0),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
      {
        name: "",
        stack: "LowerBand",
        type: "line",
        data: minValues,
        smooth: true,
        symbol: "none",
        lineStyle: {
          opacity: 0,
        },
        tooltip: {
          show: false,
        },
      },
      {
        name: "",
        type: "line",
        data: maxValues,
        smooth: true,
        symbol: "none",
        lineStyle: {
          opacity: 0,
        },
        tooltip: {
          show: false,
        },
      },
      {
        z: -1,
        name: "",
        stack: "LowerBand",
        tooltip: {
          show: false,
        },
        type: "line",
        areaStyle: {
          color: "rgba(204,204,204,0.5)",
          opacity: 1,
          origin: "start",
        },
        lineStyle: {
          opacity: 0,
        },
        emphasis: {
          disabled: true,
        },
        symbolSize: 0,
        data: rangeValues,
      },
      {
        name: "Volume",
        type: "bar",
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data0.volumes,
        itemStyle: {
          color: function (params) {
            if (params.data[2] === 1) {
              return upColor;
            } else {
              return downColor;
            }
          },
          borderColor: undefined,
          // borderColor0: undefined,
        },
      },
    ],
  };
  return (
    <div>
      <span>CandelsVolume</span>
      <ReactECharts
        option={options}
        style={{
          height: "800px",
        }}
      />
    </div>
  );
};

export default memo(CandelsVolume);
