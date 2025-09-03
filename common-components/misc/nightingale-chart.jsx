import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useTailwindBreakpoints } from "@/hooks/useTailwindBreakpoints";

echarts.registerTheme("my_theme", {
  backgroundColor: "rgb(18 19 19)",
});

export default function NightingaleChart({ cardData }) {
  const { sm, md, lg, xl, "2xl": xxl } = useTailwindBreakpoints();

  const chartDataFormatted = useMemo(() => {
    const labels = cardData?.map((item) => item?.label);
    const color = cardData?.map((item) => item?.color);
    const data = cardData?.map((item) => {
      return {
        value: parseFloat(item?.subLabel.replace('%', '')), // Use percentage directly
        name: item?.label,
      };
    });
    return {
      labels,
      data,
      color,
    };
  }, [cardData]);

  const option = {
    color: chartDataFormatted?.color,
    tooltip: {
      trigger: "item",
      formatter: function(params) {
        return `${params.name}: ${params.value}%`;
      }
    },
    legend: {
      top: "5%",
      left: "center",
      show: false,
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: ["65%", sm ? "90%" : "95%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
            formatter: function(params) {
              return `${params.name}\n${params.value}%`;
            }
          },
        },
        labelLine: {
          show: false,
        },
        data: chartDataFormatted?.data,
      },
    ],
  };

  return (
    <ReactECharts
      theme={"my_theme"}
      option={option}
      style={{ height: "100%", padding: "50px" }}
    />
  );
}