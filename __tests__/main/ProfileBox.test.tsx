import ProfileBox from "@/components/main/ProfileBox";
import { render } from "@testing-library/react-native";
import React from "react";

import DefaultProfileImg from "@/assets/images/common/defaultProfile.png";
import profileImage from "../../assets/images/testImg/blackSpirit.jpg";

import { jest } from "@jest/globals";
import { ImageSourcePropType } from "react-native";

jest.mock("react-native/Libraries/Image/Image", () => "Image");

interface ProfileBoxProps {
  name: string | null;
  level: number | null;
  profile_img?: ImageSourcePropType;
}

describe("ProfileBox", () => {
  const profileData: ProfileBoxProps = {
    level: 21,
    name: "문미새",
    profile_img: profileImage,
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
      <ProfileBox
        name={profileData.name}
        level={profileData.level}
        profile_img={profileData.profile_img ?? DefaultProfileImg}
      />
    );

    expect(
      getByText(`LV.${profileData.level} ${profileData.name}`)
    ).toBeTruthy();
  });

  // 날짜 가져오기
  it("날짜를 올바르게 가져온다.", () => {
    const { getByText } = render(
      <ProfileBox
        name={profileData.name}
        level={profileData.level}
        profile_img={profileData.profile_img ?? DefaultProfileImg}
      />
    );

    expect(getByText(`📆 ${dummyDate}`)).toBeTruthy();
  });

  // 프로필 이미지와 레벨 메달 가져오기
  it("프로필 이미지와 레벨 메달을 올바르게 렌더링한다.", () => {
    const { getByTestId } = render(
      <ProfileBox
        name={profileData.name}
        level={profileData.level}
        profile_img={profileData.profile_img ?? DefaultProfileImg}
      />
    );

    expect(getByTestId("profile-image")).toBeTruthy();
    expect(getByTestId("medal-image")).toBeTruthy();
  });

  // 프로필 이미지가 없을 때 DefaultProfileImg 사용
  it("profile_img props가 없으면, DefaultProfileImg를 사용한다.", () => {
    const { getByTestId } = render(<ProfileBox name="테스트유저" level={5} />);

    const img = getByTestId("profile-image");
    expect(img.props.source).toBe(DefaultProfileImg);
  });
});
