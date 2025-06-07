jest.mock("victory-native", () => {
  const React = require("react");
  const { View, Text } = require("react-native");

  return {
    VictoryChart: (props: any) => (
      <View testID="victory-chart">{props.children}</View>
    ),
    VictoryAxis: (props: any) => (
      <View
        testID={props.dependentAxis ? "victory-axis-dependent" : "victory-axis"}
      />
    ),
    VictoryLine: (props: any) => (
      <View testID="victory-line" data={props.data} />
    ),
    VictoryScatter: (props: any) => (
      <View testID="victory-scatter" data={props.data} labels={props.labels} />
    ),
    VictoryContainer: (props: any) => (
      <View testID="victory-container">{props.children}</View>
    ),
    VictoryTheme: { material: {} },
    VictoryTooltip: (_props: any) => <Text testID="victory-tooltip" />,
  };
});

import TodoChart from "@/components/mypage/TodoChart";
import { TodoTableType } from "@/types/DBType";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

const RealDate = Date;
let todoData: TodoTableType[];

beforeAll(() => {
  const constant = new RealDate(2025, 4, 21, 12, 0, 0);
  global.Date = class extends RealDate {
    constructor(date?: string | number | Date) {
      super(date ?? constant);
    }
    static now(): number {
      return constant.getTime();
    }
    static parse = RealDate.parse;
    static UTC = RealDate.UTC;
  } as unknown as typeof Date;

  todoData = [
    {
      todo_id: 1,
      title: "Todo 1",
      description: "설명1",
      is_done: true,
      created_at: new Date(),
    } as any,
    {
      todo_id: 2,
      title: "Todo 2",
      description: "설명2",
      is_done: false,
      created_at: new Date(),
    } as any,
    {
      todo_id: 3,
      title: "Todo 3",
      description: "설명3",
      is_done: true,
      created_at: null,
    } as any,
    {
      todo_id: 4,
      title: "Todo 4",
      description: "설명4",
      is_done: true,
      created_at: new Date(),
    } as any,
    {
      todo_id: 5,
      title: "Todo 5",
      description: "설명5",
      is_done: true,
      created_at: new Date(2025, 4, 18, 12, 0, 0),
    } as any,
  ];
});

afterAll(() => {
  global.Date = RealDate;
});

describe("TodoChart", () => {
  it("차트 제목이 렌더링 된다", () => {
    const { getByText } = render(<TodoChart todoList={todoData} />);

    expect(getByText("주간 완료 횟수")).toBeTruthy();
  });

  it("onLayout 호출 시 차트 width값이 수정된다", () => {
    const { getByTestId } = render(<TodoChart todoList={todoData} />);
    const container = getByTestId("chart-container");

    fireEvent(container, "layout", {
      nativeEvent: { layout: { width: 200 } },
    });

    expect(container).toBeTruthy();
  });

  it("올바르게 완료된 todo만 적용한다", () => {
    const { getByTestId } = render(<TodoChart todoList={todoData} />);
    const line = getByTestId("victory-line");
    const sum = (line.props.data as { x: number; y: number }[]).reduce(
      (acc: number, point: { x: number; y: number }) => acc + point.y,
      0
    );

    expect(sum).toBe(2);
  });

  it("todoList가 null일 경우 전부 0으로 채운다", () => {
    const { getByTestId } = render(<TodoChart todoList={null} />);
    const line = getByTestId("victory-line");
    const zeros = Array.from({ length: 7 }, (_, i) => ({ x: i, y: 0 }));

    expect(line.props.data).toEqual(zeros);
  });

  it("label이 데이터에 맞게 제대로 출력된다.", () => {
    const { getByTestId } = render(<TodoChart todoList={todoData} />);
    const scatter = getByTestId("victory-scatter");
    type LabelFn = (args: { datum: { y: number } }) => string;
    const labelFn = scatter.props.labels as LabelFn;

    expect(labelFn({ datum: { y: 0 } })).toBe("0개 완료");
    expect(labelFn({ datum: { y: 5 } })).toBe("5개 완료");
  });
});
