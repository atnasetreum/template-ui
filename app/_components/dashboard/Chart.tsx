"use client";

import { useContext, useEffect, useState } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { optionsChartDefault } from "@config";

import { SocketContext } from "@contexts";

if (typeof Highcharts === "object") {
  require("highcharts/modules/exporting")(Highcharts);
  require("highcharts/modules/drilldown")(Highcharts);
  require("highcharts/modules/accessibility")(Highcharts);
}

export const Chart = () => {
  const { socket } = useContext(SocketContext);

  const [dataRealTime, setDataRealTime] = useState<(string | number)[][]>([]);

  useEffect(() => {
    const event = "total-revenue";
    socket?.on(event, (data) => {
      setDataRealTime(data);
    });
    return () => {
      socket?.off(event);
    };
  }, [socket]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      containerProps={{ style: { height: "100%" } }}
      options={{
        ...optionsChartDefault,
        title: {
          text: "Growth of Internet Users Worldwide (logarithmic scale)",
        },

        accessibility: {
          point: {
            valueDescriptionFormat:
              "{xDescription}{separator}{value} million(s)",
          },
        },

        xAxis: {
          title: {
            text: "Year",
          },
          categories: [1995, 2000, 2005, 2010, 2015, 2020, 2023],
        },

        yAxis: {
          type: "logarithmic",
          title: {
            text: "Number of Internet Users (in millions)",
          },
        },

        tooltip: {
          headerFormat: "<b>{series.name}</b><br />",
          pointFormat: "{point.y} million(s)",
        },

        series: [
          {
            name: "Internet Users",
            keys: ["y", "color"],
            data: dataRealTime,
            color: {
              linearGradient: {
                x1: 0,
                x2: 0,
                y1: 1,
                y2: 0,
              },
              stops: [
                [0, "#0000ff"],
                [1, "#ff0000"],
              ],
            },
          },
        ],
      }}
    />
  );
};
