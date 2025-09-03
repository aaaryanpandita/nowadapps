import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useTailwindBreakpoints } from "@/hooks/useTailwindBreakpoints";

// Register theme only once and handle potential errors
try {
  echarts.registerTheme("my_theme", {
    backgroundColor: "rgb(18 19 19)",
  });
} catch (error) {
  console.warn("Failed to register echarts theme:", error);
}

export default function NightingaleChart({ cardData }) {
  // Guard clause for missing or invalid data
  if (!cardData || !Array.isArray(cardData) || cardData.length === 0) {
    return (
      <div style={{ width: '100%', height: '400px' }} className="flex items-center justify-center">
        <div className="text-white">Loading chart...</div>
      </div>
    );
  }

  // Safely get breakpoints with fallback
  let breakpoints = {};
  try {
    breakpoints = useTailwindBreakpoints();
  } catch (error) {
    console.warn("useTailwindBreakpoints hook failed:", error);
    breakpoints = { sm: false, md: false, lg: false, xl: false, "2xl": false };
  }
  
  const { sm, md, lg, xl, "2xl": xxl } = breakpoints;

  const chartDataFormatted = useMemo(() => {
    try {
      const labels = cardData.map((item) => item?.label || "Unknown");
      const color = cardData.map((item) => item?.color || "#CCCCCC");
      const data = cardData.map((item) => {
        const percentage = item?.subLabel ? parseFloat(item.subLabel.replace('%', '')) : 0;
        return {
          value: isNaN(percentage) ? 0 : percentage,
          name: item?.label || "Unknown",
        };
      });
      return {
        labels,
        data,
        color,
      };
    } catch (error) {
      console.error("Error formatting chart data:", error);
      return {
        labels: [],
        data: [],
        color: [],
      };
    }
  }, [cardData]);

  // Don't render if no valid data
  if (!chartDataFormatted.data || chartDataFormatted.data.length === 0) {
    return (
      <div style={{ width: '100%', height: '400px' }} className="flex items-center justify-center">
        <div className="text-white">No data available</div>
      </div>
    );
  }

  const option = {
    color: chartDataFormatted.color,
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
        name: "Token Distribution",
        type: "pie",
        radius: ["65%", (sm !== undefined && sm) ? "90%" : "95%"],
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
            fontSize: 14,
            fontWeight: "bold",
            color: "white",
            formatter: function(params) {
              // Truncate long text and add line breaks for better fit
              let name = params.name;
              if (name.length > 25) {
                name = name.substr(0, 25) + '...';
              }
              // Break long names into multiple lines
              const words = name.split(' ');
              let lines = [];
              let currentLine = '';
              
              for (let i = 0; i < words.length; i++) {
                const word = words[i];
                if ((currentLine + word).length > 15 && currentLine !== '') {
                  lines.push(currentLine.trim());
                  currentLine = word + ' ';
                } else {
                  currentLine += word + ' ';
                }
              }
              if (currentLine.trim() !== '') {
                lines.push(currentLine.trim());
              }
              
              return lines.join('\n') + `\n${params.value}%`;
            },
            textStyle: {
              lineHeight: 16,
              textShadowColor: 'rgba(0, 0, 0, 0.8)',
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
            }
          },
        },
        labelLine: {
          show: false,
        },
        data: chartDataFormatted.data,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ReactECharts
        theme={"my_theme"}
        option={option}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: 'canvas' }}
        onChartReady={() => {
          console.log("Chart rendered successfully");
        }}
        onEvents={{
          'finished': () => {
            console.log("Chart finished rendering");
          }
        }}
      />
    </div>
  );
}