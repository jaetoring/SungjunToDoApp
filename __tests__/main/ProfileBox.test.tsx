import ProfileBox from "@/components/main/ProfileBox";
import { render } from "@testing-library/react-native";
import React from "react";

import profileImage from "../../assets/images/testImg/blackSpirit.jpg";
import medalImage from "../../assets/images/testImg/testMedal.png";

import { jest } from "@jest/globals";

jest.mock("react-native/Libraries/Image/Image", () => "Image");

describe("ProfileBox", () => {
  const profileData = {
    level: 21,
    name: "문미새",
    profileImage,
    medalImage,
  };

  const getFormattedDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(today);
  };

  const dummyDate = getFormattedDate();

  // 유저 데이터 조회합니다.
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
  });

  // 프로필 이미지와 레벨 메달 가져오기
  it("프로필 이미지와 레벨 메달을 올바르게 렌더링한다.", () => {
    const { getByTestId } = render(
      <ProfileBox date={dummyDate} profileData={profileData} />
    );

    expect(getByTestId("profile-image")).toBeTruthy();
    expect(getByTestId("medal-image")).toBeTruthy();
  });
});
