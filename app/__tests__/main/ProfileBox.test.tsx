import ProfileBox from "@/components/main/ProfileBox";
import { render } from "@testing-library/react-native";
import React from "react";

jest.mock("react-native/Libraries/Image/Image", () => "Image");

describe("ProfileBox", () => {
  const profileData = {
    level: 21,
    name: "문미새",
    profileImage: require("@/assets/images/testImg/blackSpirit.jpg"),
    medalImage: require("@/assets/images/testImg/testMedal.png"),
  };

  const getFormattedDate = () => {
    const today = new Date();
    console.log(today);
    const options = { month: "long", day: "numeric", weekday: "long" };
    const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(
      today
    );
    return formattedDate;
  };

  const dummyDate = getFormattedDate();

  // 유저 데이터 조회
  it("유저 정보를 올바르게 렌더링한다.", () => {
    const { getByText } = render(
      <ProfileBox date={dummyDate} profileData={profileData} />
    );

    expect(
      getByText(`LV.${profileData.level} ${profileData.name}`)
    ).toBeTruthy();
  });
    
    // 날짜 가져오기
    it("날짜를 올바르게 가져온다.", () => {
        const { getByText } = render(
            <ProfileBox date={dummyDate} profileData={profileData} />
        );

        expect(getByText(`📆 ${dummyDate}`)).toBeTruthy();
    })

  // 프로필 이미지와 레벨 메달 가져오기
  it("프로필 이미지와 레벨 메달을 올바르게 렌더링한다.", () => {
    const { getByTestId } = render(
      <ProfileBox date={dummyDate} profileData={profileData} />
    );

    expect(getByTestId("profile-image")).toBeTruthy();
    expect(getByTestId("medal-image")).toBeTruthy();
  });
});
