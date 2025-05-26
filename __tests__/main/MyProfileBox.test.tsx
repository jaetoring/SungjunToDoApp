import MyProfileBox from "@/components/mypage/MyProfileBox";
import { render } from "@testing-library/react-native";

describe("MyProfileBox", () => {
  const myProfileBoxData = {
    profile_img: { uri: "https://example.com/test.png" },
    name: "테스트이름",
    level: 1,
  };

  // 프로필 이미지 렌더링
  it("프로필 이미지가 정상적으로 렌더링된다.", () => {
    const { getByTestId } = render(<MyProfileBox {...myProfileBoxData} />);

    expect(getByTestId("myprofile-image")).toBeTruthy();
  });

  // 이름과 레벨 렌더링
  it("이름과 레벨이 정상적으로 렌더링된다.", () => {
    const { getByText } = render(<MyProfileBox {...myProfileBoxData} />);

    expect(getByText("테스트이름")).toBeTruthy();
    expect(getByText("LV.1")).toBeTruthy();
  });

  // 메달 렌더링
  it("메달 이미지가 정상적으로 렌더링된다.", () => {
    const { getByTestId } = render(<MyProfileBox {...myProfileBoxData} />);

    expect(getByTestId("medal-image")).toBeTruthy();
  });
});
