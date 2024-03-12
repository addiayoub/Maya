import React, { memo } from "react";
import Trading from "./Trading";
import BarChart from "./BarChart";
import TradingChartV2 from "./TradingChartV2";

const TradingContainer = ({ data }) => {
  return (
    <div>
      <TradingChartV2 data={data} />
      {/* <BarChart data={data} SN={["Volume"]} formatDate /> */}
    </div>
  );
};

export default memo(TradingContainer);
