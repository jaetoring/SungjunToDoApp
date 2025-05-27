import React from "react";

type Props = Record<string, unknown>;

export const VictoryChart = (props: Props): React.ReactElement =>
  React.createElement("mock-victory-chart", props);

export const VictoryLine = (props: Props): React.ReactElement =>
  React.createElement(
    "mock-victory-line",
    Object.assign({ testID: "victory-line" }, props)
  );

export const VictoryAxis = (props: Props): React.ReactElement =>
  React.createElement("mock-victory-axis", props);

export const VictoryTooltip = (props: Props): React.ReactElement =>
  React.createElement("mock-victory-tooltip", props);

export const VictoryScatter = (props: Props): React.ReactElement =>
  React.createElement(
    "mock-victory-scatter",
    Object.assign({ testID: "victory-scatter" }, props)
  );

export const VictoryTheme = {};
