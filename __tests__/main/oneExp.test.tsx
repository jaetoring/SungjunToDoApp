import OneExp from "@/components/main/OneExp";
import { render } from "@testing-library/react-native";

describe("OneExp Component", () => {
  // fillBox 값이 0일 때, empty-block 렌더링
  it("fillBox 값이 0일 때, empty-block을 렌더링한다.", () => {
    const { getByTestId } = render(<OneExp fillBox={0} />);
    const block = getByTestId("empty-block");
    expect(block).toBeTruthy();
  });

  // fillBox 값이 1 이상일 때, filled-block 렌더링
  it("fillBox 값이 1 이상일 때, filled-block을 렌더링한다.", () => {
    const { getByTestId } = render(<OneExp fillBox={1} />);
    const block = getByTestId("filled-block");
    expect(block).toBeTruthy();
  });

  // fillBox 값에 따른 width 비율 확인
  it("fillBox 값에 따라 width가 비율로 설정된다.", () => {
    const { getByTestId } = render(<OneExp fillBox={0.5} />);
    const block = getByTestId("filled-block");
    expect(block).toHaveStyle({ width: "50%" });
  });

  // fillBox값을 받지 못했을 때
  it("fillBox값을 받지 못했을 때 기본값 0으로 empty-block을 렌더링한다.", () => {
    const { getByTestId } = render(<OneExp />);
    expect(getByTestId("empty-block")).toBeTruthy();
  });
});
