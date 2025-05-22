import FormInput from "@/components/common/FormInput";
import { render } from "@testing-library/react-native";
import React from "react";

describe("FormInput", () => {
  const baseProps = {
    value: "",
    onChangeText: jest.fn(),
    placeholder: "입력",
  };

  const renderInput = (props = {}) =>
    render(<FormInput {...baseProps} {...props} />);

  // 정규식에 맞게 입력 시
  it("정규식에 맞게 입력했을 때 '일치한다'는 메세지가 출력된다.", () => {
    const { getByPlaceholderText, getByText, queryByText } = renderInput({
      touched: true,
      isValid: true,
      successMessage: "✓ 일치합니다.",
      errorMessage: "일치하지 않습니다.",
    });

    const input = getByPlaceholderText("입력");
    expect(input.props.className).toContain("border-green-400");
    expect(getByText("✓ 일치합니다.")).toBeTruthy();
    expect(queryByText("일치하지 않습니다.")).toBeNull();
  });

  // 정규식에 맞지 않게 입력 시
  it("정규식에 맞지 않게 입력했을 때 '일치하지 않는다'는 메세지가 출력된다.", () => {
    const { getByPlaceholderText, getByText, queryByText } = renderInput({
      touched: true,
      isValid: false,
      successMessage: "✓ 일치합니다.",
      errorMessage: "일치하지 않습니다.",
    });

    const input = getByPlaceholderText("입력");
    expect(input.props.className).toContain("border-red-400");
    expect(getByText("일치하지 않습니다.")).toBeTruthy();
    expect(queryByText("✓ 일치합니다.")).toBeNull();
  });

  // 입력하기 전 상태
  it("아무것도 입력하지 않으면 메세지가 출력되지 않는다.", () => {
    const { queryByText } = renderInput({
      touched: true,
      isValid: true,
    });

    expect(queryByText("✓ 일치합니다.")).toBeNull();
    expect(queryByText("일치하지 않습니다.")).toBeNull();
  });
});
