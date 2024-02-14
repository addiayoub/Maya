import moment from "moment";

export const candelChartTransformData = (
  arrayData,
  seance,
  open,
  close,
  higher,
  lower
) => {
  console.log("array data", arrayData);
  const categoryData = [];
  const values = [];
  arrayData.map((item) => {
    categoryData.push(moment(item[seance]).format("DD/MM/YYYY"));
    values.push([item[open], item[close], item[lower], item[higher]]);
  });
  return { categoryData, values };
};

export const calculateMA = (dayCount, data0) => {
  var result = [];
  for (var i = 0, len = data0.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push("-");
      continue;
    }
    let sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += +data0.values[i - j][1];
    }
    result.push((sum / dayCount).toFixed(2));
  }
  return result;
};
