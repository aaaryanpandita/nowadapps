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

  // Responsive configuration based on screen size
  const getResponsiveConfig = () => {
    if (!sm) { // Mobile
      return {
        radius: ["50%", "85%"],
        fontSize: 12,
        maxNameLength: 12,
        maxLineLength: 10,
        lineHeight: 14,
        borderWidth: 1,
        height: '350px'
      };
    } else if (!md) { // Small tablet
      return {
        radius: ["55%", "88%"],
        fontSize: 13,
        maxNameLength: 18,
        maxLineLength: 12,
        lineHeight: 15,
        borderWidth: 1.5,
        height: '400px'
      };
    } else if (!lg) { // Medium tablet
      return {
        radius: ["60%", "90%"],
        fontSize: 14,
        maxNameLength: 20,
        maxLineLength: 15,
        lineHeight: 16,
        borderWidth: 2,
        height: '400px'
      };
    } else { // Desktop
      return {
        radius: ["65%", "95%"],
        fontSize: 14,
        maxNameLength: 25,
        maxLineLength: 15,
        lineHeight: 16,
        borderWidth: 2,
        height: '400px'
      };
    }
  };

  const config = getResponsiveConfig();

  const option = {
    color: chartDataFormatted.color,
    tooltip: {
      trigger: "item",
      formatter: function(params) {
        return `${params.name}: ${params.value}%`;
      },
      textStyle: {
        fontSize: !sm ? 12 : 14
      },
      confine: true, // Keep tooltip within chart area
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
        radius: config.radius,
        center: ['50%', '50%'],
        avoidLabelOverlap: true, // Enable label overlap avoidance
        itemStyle: {
          borderRadius: !sm ? 6 : 10,
          borderColor: "#fff",
          borderWidth: config.borderWidth,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: config.fontSize,
            fontWeight: "bold",
            color: "white",
            formatter: function(params) {
              let name = params.name;
              
              // Truncate based on screen size
              if (name.length > config.maxNameLength) {
                name = name.substr(0, config.maxNameLength) + '...';
              }
              
              // Break long names into multiple lines with responsive line length
              const words = name.split(' ');
              let lines = [];
              let currentLine = '';
              
              for (let i = 0; i < words.length; i++) {
                const word = words[i];
                if ((currentLine + word).length > config.maxLineLength && currentLine !== '') {
                  lines.push(currentLine.trim());
                  currentLine = word + ' ';
                } else {
                  currentLine += word + ' ';
                }
              }
              if (currentLine.trim() !== '') {
                lines.push(currentLine.trim());
              }
              
              // Limit lines on mobile
              if (!sm && lines.length > 2) {
                lines = lines.slice(0, 2);
                if (lines[1]) {
                  lines[1] = lines[1].substr(0, config.maxLineLength - 3) + '...';
                }
              }
              
              return lines.join('\n') + `\n${params.value}%`;
            },
            textStyle: {
              lineHeight: config.lineHeight,
              textShadowColor: 'rgba(0, 0, 0, 0.8)',
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
            }
          },
          itemStyle: {
            shadowBlur: !sm ? 5 : 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        },
        labelLine: {
          show: false,
        },
        data: chartDataFormatted.data,
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: config.height }} className="relative">
      <ReactECharts
        theme={"my_theme"}
        option={option}
        style={{ height: "100%", width: "100%" }}
        opts={{ 
          renderer: 'canvas',
          devicePixelRatio: window.devicePixelRatio || 1
        }}
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