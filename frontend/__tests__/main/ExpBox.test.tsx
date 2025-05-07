import ExpBox from "@/components/main/ExpBox";
import { render } from "@testing-library/react-native";

describe("ExpBox", () => {
  const DummyExpData = {
    level: 21,
    currentExp: 30,
    maxExp: 100,
  };

  const DummyExp0Data = {
    level: 21,
    currentExp: 0,
    maxExp: 100,
  };
  const DummyExp105Data = {
    level: 21,
    currentExp: 105,
    maxExp: 100,
  };

  // 렌더링 확인
  it("경험치 바가 올바르게 렌더링 된다.", () => {
    const { getByTestId } = render(<ExpBox expData={DummyExpData} />);

    expect(getByTestId("exp-bar")).toBeTruthy();
  });

  // 경험치가 없을 때 블록이 전부 비어있는지
  it("현재 경험치가 0일 때, 모든 블록이 비어있어야 한다.", () => {
    const { getAllByTestId } = render(<ExpBox expData={DummyExp0Data} />);

    const emptyBlocks = getAllByTestId("empty-block");
    expect(emptyBlocks.length).toBe(10);
  });

  // 경험치가 100을 넘었을 때
  it("경험치가 100을 넘었을 때, 레벨업하고 나머지가 처리되야 한다.", () => {
    const { getByTestId, getAllByTestId } = render(
      <ExpBox expData={DummyExp105Data} />
    );

    expect(getByTestId("exp-level")).toHaveTextContent("LV.22");

    const filledBlocks = getAllByTestId("filled-block");
    expect(filledBlocks.length).toBe(1);
  });

  // 경험치 값이 올바르게 출력되는지
  it("경험치 값이 올바르게 출력된다.", () => {
    const { getByText } = render(<ExpBox expData={DummyExpData} />);

    expect(getByText("(30 / 100XP)")).toBeTruthy();
  });
});
