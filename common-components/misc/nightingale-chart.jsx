import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useTailwindBreakpoints } from "@/hooks/useTailwindBreakpoints";

echarts.registerTheme("my_theme", {
  backgroundColor: "rgb(18 19 19)",
});
export default function NightingaleChart() {
  const { sm, md, lg, xl, "2xl": xxl } = useTailwindBreakpoints();

  const chartSize = useMemo(() => {
    if (md) {
      return [90, 200];
    }

    return [90, 160];
  });

  const option = {
    title: {
      // text: "Nightingale Chart",
      // subtext: "Fake Data",
      left: "center",
    },
    legend: {
      left: "center",
      top: "bottom",
      orient: "vertical",
      data: [
        "rose1",
        "rose2",
        "rose3",
        "rose4",
        "rose5",
        "rose6",
        "rose7",
        "rose8",
      ],
    },

    series: [
      {
        name: "Area Mode",
        type: "pie",
        radius: chartSize,
        roseType: "area",
        itemStyle: {
          borderRadius: 5,
        },
        label: {
          show: sm,
          color: "#ffffff",
        },

        data: [
          { value: 30, name: "rose 1" },
          { value: 28, name: "rose 2" },
          { value: 26, name: "rose 3" },
          { value: 24, name: "rose 4" },
          { value: 22, name: "rose 5" },
          { value: 20, name: "rose 6" },
          { value: 18, name: "rose 7" },
          { value: 16, name: "rose 8" },
        ],
      },
    ],
  };

  return (
    <ReactECharts
      theme={"my_theme"}
      option={option}
      style={{ height: sm ? "600px" : "400px" }}
    />
  );
}
