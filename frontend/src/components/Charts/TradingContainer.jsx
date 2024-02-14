import React from "react";
import Trading from "./Trading";
import BarChart from "./BarChart";

const TradingContainer = ({ data }) => {
  return (
    <div>
      <Trading data={data} />
      <BarChart data={data} SN={["Volume"]} formatDate />
    </div>
  );
};

export default TradingContainer;
