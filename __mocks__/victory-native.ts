import React from "react";

type AnyProps = Record<string, unknown>;
type ChartPoint = { x: number; y: number };

export const VictoryChart = (props: AnyProps): React.ReactElement =>
  React.createElement("mock-victory-chart", props);

export const VictoryAxis = (props: AnyProps): React.ReactElement =>
  React.createElement("mock-victory-axis", props);

export const VictoryTooltip = (props: AnyProps): React.ReactElement =>
  React.createElement("mock-victory-tooltip", props);

export const VictoryLine = (props: {
  data: ChartPoint[];
  testID?: string;
}): React.ReactElement =>
  React.createElement("mock-victory-line", {
    testID: props.testID ?? "victory-line",
    ...props,
  });

export const VictoryScatter = (props: {
  labels: (args: { datum: { y: number } }) => string;
  testID?: string;
}): React.ReactElement =>
  React.createElement("mock-victory-scatter", {
    testID: props.testID ?? "victory-scatter",
    ...props,
  });

export const VictoryTheme = {};
