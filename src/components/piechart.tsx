"use client";

import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

type dataType = {
  id: string;
  value: number;
  color: string;
};

const MyResponsivePie = ({ data }: { data: dataType[] }) => (
  <ResponsivePie
    fit={false}
    data={data}
    colors={{ datum: "data.color" }}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.85}
    padAngle={1}
    cornerRadius={2}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    enableArcLinkLabels={false}
    enableArcLabels={false}
  />
);

export { MyResponsivePie };
