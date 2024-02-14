import React, { useMemo } from "react";
import TradingChart from "./TradingChart";
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

const Trading = ({ data }) => {
  const data0 = useMemo(
    () =>
      candelChartTransformData(data, "Date", "Open", "Close", "Low", "High"),
    [data]
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
  const options = useMemo(() => {
    return {
      legend: {
        padding: 10,
      },
      grid: {
        left: "10%",
        // right: "10%",
        bottom: "20%",
      },
      xAxis: {
        type: "category",
        data: data0.categoryData,
      },
      dataZoom: [
        {
          type: "inside",
          start: 50,
          end: 100,
        },
        {
          show: true,
          type: "slider",
          top: "90%",
          start: 50,
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
            borderColor: upBorderColor,
            borderColor0: downBorderColor,
          },
          markPoint: {
            label: {
              formatter: function (param) {
                return param != null ? Math.round(param.value) + "" : "";
              },
            },
            data: [
              {
                name: "Mark",
                // coord: ["2013/5/31", 2300],
                value: 2300,
                itemStyle: {
                  color: "rgb(41,60,85)",
                },
              },
              {
                name: "highest value",
                type: "max",
                valueDim: "highest",
              },
              {
                name: "lowest value",
                type: "min",
                valueDim: "lowest",
              },
              {
                name: "average value on close",
                type: "average",
                valueDim: "close",
              },
            ],
            tooltip: {
              formatter: function (param) {
                return param.name + "<br>" + (param.data.coord || "");
              },
            },
          },
          markLine: {
            symbol: ["none", "none"],
            data: [
              [
                {
                  name: "from lowest to highest",
                  type: "min",
                  valueDim: "lowest",
                  symbol: "circle",
                  symbolSize: 10,
                  label: {
                    show: false,
                  },
                  emphasis: {
                    label: {
                      show: false,
                    },
                  },
                },
                {
                  type: "max",
                  valueDim: "highest",
                  symbol: "circle",
                  symbolSize: 10,
                  label: {
                    show: false,
                  },
                  emphasis: {
                    label: {
                      show: false,
                    },
                  },
                },
              ],
              {
                name: "min line on close",
                type: "min",
                valueDim: "close",
              },
              {
                name: "max line on close",
                type: "max",
                valueDim: "close",
              },
            ],
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
      ],
    };
  }, [data0, data]);
  return (
    <div>
      <TradingChart options={options} />
    </div>
  );
};

export default Trading;
