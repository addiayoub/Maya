import React, { memo, useMemo, useRef } from "react";
import ReactECharts from "echarts-for-react";
import {
  defaultOptions,
  getFullscreenFeature,
} from "../../utils/Chart/defaultOptions";
import moment from "moment";

const generateSeries = (data, seriesNames) => {
  return seriesNames.map((serieName) => ({
    name: serieName,
    type: "line",
    symbol: "none",
    data: data.map((item) =>
      item[serieName] < 1 ? item[serieName] * 100 : item[serieName]
    ),
  }));
};

const LineChart = ({ data, style }) => {
  const chart = useRef(null);
  const myFullscreen = getFullscreenFeature(chart);
  console.log("Chart data", data);
  const dateKey = Object.keys(data[0])[0];
  const seances = useMemo(
    () => data.map((item) => moment(item[dateKey]).format("DD/MM/YYYY")),
    [data]
  );
  const seriesNames = Object.keys(data[0]).filter((item) => item !== dateKey);
  const series = useMemo(() => generateSeries(data, seriesNames));
  // const theme = useChartTheme();
  console.log("render LineChart");
  const minYaxis = useMemo(
    () => Math.min(...series.map((item) => item.data).flat()),
    [series]
  );

  const {
    dataZoom: zoom,
    toolbox: {
      feature: { saveAsImage, dataZoom, restore },
    },
  } = defaultOptions;
  const baseOptions = useMemo(() => {
    return {
      title: {},
      xAxis: {
        type: "category",
        data: seances,
        axisLabel: {
          hideOverlap: true,
        },
      },
      yAxis: {
        type: "value",
        min: Math.trunc(minYaxis),
        axisLabel: {
          hideOverlap: true,
        },
        splitLine: {
          show: false,
        },
      },
      legend: {
        orient: "horizontal",
        zLevel: 23,
        width: "70%",
        bottom: "10%",
        type: "scroll",
        textStyle: {
          width: 150,
          rich: {
            fw600: {
              fontWeight: 600,
            },
          },
        },
      },
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
        valueFormatter: (value) => value?.toFixed(2),
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
      dataZoom: zoom,
      series,
    };
  }, [series]);
  console.log("basedoptions", baseOptions);
  return (
    <div className="relative">
      <ReactECharts
        option={baseOptions}
        key={JSON.stringify(baseOptions)}
        style={{
          minHeight: 400,
          width: "100%",
          ...style,
        }}
        ref={chart}
      />
    </div>
  );
};

export default memo(LineChart);
