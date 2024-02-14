import React, { useMemo } from "react";
import LineChart from "./LineChart";
import moment from "moment";

const generateSeries = (data, seriesNames) => {
  return seriesNames.map((serieName) => ({
    name: serieName,
    type: "line",
    symbol: "none",
    data: data.map((item) => item[serieName]),
  }));
};

const FirstChart = ({ data }) => {
  // const data = [
  //   {
  //     date_vl: "2023-01-06 00:00:00",
  //     "BENCHMARK : MASI RENTABILITE BRUT": 100,
  //     "CLASEE : ACTIONS": 100,
  //     "OPCVM : RMA EQUITY MARKET": 100,
  //   },
  // ];
  console.log("Chart data", data);
  const dateKey = Object.keys(data[0])[0];
  const seances = useMemo(
    () => data.map((item) => moment(item[dateKey]).format("DD/MM/YYYY")),
    [data]
  );
  const seriesNames = Object.keys(data[0]).filter((item) => item !== dateKey);
  const series = useMemo(() => generateSeries(data, seriesNames));
  console.log(
    "values",
    Math.trunc(Math.min(...series.map((item) => item.data).flat()))
  );
  const options = {
    title: {
      text: "",
      left: "center",
    },
    grid: {
      right: "100px",
    },
    xAxis: {
      type: "category",
      data: seances,
    },
    yAxis: {
      type: "value",
    },
    series,
  };
  return (
    <LineChart
      options={options}
      style={{
        minHeight: 400,
      }}
    />
  );
};

export default FirstChart;
