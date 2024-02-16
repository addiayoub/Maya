import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { getChartType } from "../../utils/Chart/defaultOptions";
import TradingContainer from "./TradingContainer";
import TradingChartV2 from "./TradingChartV2";

export const Chart = ({ data, type }) => {
  type = getChartType(type);
  if (type === "line") {
    return <LineChart data={data} />;
  }
  if (type === "bar") {
    return <BarChart data={data} />;
  }
  if (type === "trading") {
    return <TradingChartV2 data={data} />;
  }
  return <LineChart data={data} />;
};
