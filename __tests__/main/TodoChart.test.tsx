jest.mock("victory-native");

import TodoChart from "@/components/mypage/TodoChart";
import { TodoTableType } from "@/types/DBType";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

interface ChartPoint {
  x: number;
  y: number;
}

const RealDate = Date;
let todoData: TodoTableType[];

beforeAll(() => {
  const constant = new RealDate(2025, 4, 21, 12, 0, 0);
  global.Date = class extends RealDate {
    constructor(date?: Date | string | number) {
      super(date ?? constant);
    }
    static now(): number {
      return constant.getTime();
    }
    static parse = RealDate.parse;
    static UTC = RealDate.UTC;
  } as any;

  todoData = [
    // 완료 todo
    {
      todo_id: 1,
      title: "Todo 1",
      description: "설명1",
      is_done: true,
      created_at: new Date(),
    },
    // 미완료 todo
    {
      todo_id: 2,
      title: "Todo 2",
      description: "설명2",
      is_done: false,
      created_at: new Date(),
    },
    // 날짜 null
    {
      todo_id: 3,
      title: "Todo 3",
      description: "설명3",
      is_done: true,
      created_at: null,
    },
    {
      todo_id: 4,
      title: "Todo 4",
      description: "설명4",
      is_done: true,
      created_at: new Date(),
    },
    // 주간 차트 외의 날짜
    {
      todo_id: 5,
      title: "Todo 5",
      description: "설명5",
      is_done: true,
      created_at: new Date(2025, 4, 18, 12, 0, 0),
    },
  ];
});

afterAll(() => {
  // Date 복원
  global.Date = RealDate;
});

describe("TodoChart", () => {
  // 차트 제목 렌더링
  it("차트 제목이 렌더링 된다", () => {
    const { getByText } = render(<TodoChart todoList={todoData} />);
    expect(getByText("주간 완료 횟수")).toBeTruthy();
  });

  // 차트 width값 수정
  it("onLayout 호출 시 차트 width값이 수정된다", () => {
    const { getByTestId } = render(<TodoChart todoList={todoData} />);
    const container = getByTestId("chart-container");
    fireEvent(container, "layout", { nativeEvent: { layout: { width: 200 } } });
    expect(container).toBeTruthy();
  });

  // 완료된 todo만 체크
  it("올바르게 완료된 todo만 적용한다", () => {
    const { getByTestId } = render(<TodoChart todoList={todoData} />);
    const line = getByTestId("victory-line");
    const sum = (line.props.data as ChartPoint[]).reduce(
      (acc: number, point: ChartPoint) => acc + point.y,
      0
    );
    expect(sum).toBe(2);
  });

  // todoList가 없을 시
  it("todoList가 null일 경우 전부 0으로 채운다", () => {
    const { getByTestId } = render(<TodoChart todoList={null} />);
    const line = getByTestId("victory-line");
    const zeros: ChartPoint[] = Array.from(
      { length: 7 },
      (_, i): ChartPoint => ({ x: i, y: 0 })
    );
    expect(line.props.data).toEqual(zeros);
  });

  // 주간 횟수가 label로 표시
  it("label이 데이터에 맞게 제대로 출력된다.", () => {
    const { getByTestId } = render(<TodoChart todoList={todoData} />);
    const scatter = getByTestId("victory-scatter");
    type LabelFn = (args: { datum: { y: number } }) => string;
    const labelFn = scatter.props.labels as LabelFn;
    expect(labelFn({ datum: { y: 0 } })).toBe("0개 완료");
    expect(labelFn({ datum: { y: 5 } })).toBe("5개 완료");
  });
});
