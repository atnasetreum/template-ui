import React, { useContext, useEffect, useState } from "react";

import { ResponsiveLine } from "@nivo/line";

import { SocketContext } from "@contexts";

interface DataRealTime {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
}

const ChartRealTimeDashboard = () => {
  const { socket } = useContext(SocketContext);

  const [dataRealTime, setDataRealTime] = useState<DataRealTime[]>([]);

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
    <div className="aspect-[9/4]">
      <ResponsiveLine
        data={dataRealTime}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
};

export default ChartRealTimeDashboard;
