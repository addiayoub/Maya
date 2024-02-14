import React from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { getChartType } from "../../utils/Chart/defaultOptions";

export const Chart = ({ data, type }) => {
  type = getChartType(type);
  if (type === "line") {
    return <LineChart data={data} />;
  }
  if ((type = "bar")) {
    return <BarChart data={data} />;
  }
  return <LineChart data={data} />;
};
