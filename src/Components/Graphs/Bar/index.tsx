import { Bar, CartesianChart } from "victory-native";
import { colors } from "../../../Constants/Colors";

import { LinearGradient, useFont, vec } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { getAllMonthlyExpenses } from "./actions";
import React from "react";
import { Text } from "react-native";

const data = [
  {
    month: "Jan/24",
    total_expense: 1262,
  },
  {
    month: "Feb/24",
    total_expense: 1164,
  },
  {
    month: "Mar/24",
    total_expense: 478,
  },
];

export const GraphsBars = () => {
  const [dataGraphBar, setDataGraphBar] = useState([]);
  const font = useFont(require("../../../Fonts/Poppins-Italic.ttf"));

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMonthlyExpenses();
      setDataGraphBar(data);
    };

    fetchData();
  }, []);

  console.log(dataGraphBar.length);

  const DOMAIN_PADDING =
    dataGraphBar.length > 4
      ? { left: 50, right: 50, top: 20 }
      : { left: 100, right: 100, top: 50 };

  return (
    <>
      {dataGraphBar.length ? (
        <CartesianChart
          data={dataGraphBar}
          xKey="month"
          yKeys={["total_expense"]}
          domainPadding={DOMAIN_PADDING}
          axisOptions={{
            font,
            lineColor: colors.gray[400],
            labelColor: colors.gray[200],
            tickCount: dataGraphBar.length,
            lineWidth: 0.1,
            formatXLabel: (label) => label || "",
          }}
        >
          {({ points, chartBounds }) => (
            <Bar
              chartBounds={chartBounds}
              points={points.total_expense}
              roundedCorners={{
                topLeft: 5,
                topRight: 5,
              }}
              innerPadding={0.5}
            >
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, 150)}
                colors={[
                  colors.red["200"],
                  colors.red["300"],
                  colors.red["500"],
                  colors.red["600"],
                ]}
              />
            </Bar>
          )}
        </CartesianChart>
      ) : (
        <Text> Carregando ...</Text>
      )}
    </>
  );
};
