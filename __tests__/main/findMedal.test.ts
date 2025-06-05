import { getMedalByLevel } from "@/utils/findMedal";

import Medal5 from "@/assets/images/medal/1grade.png"; // 21~25
import Medal4 from "@/assets/images/medal/2grade.png"; // 16~20
import Medal3 from "@/assets/images/medal/3grade.png"; // 11~15
import Medal2 from "@/assets/images/medal/4grade.png"; // 6~10
import Medal1 from "@/assets/images/medal/5grade.png"; // 1~5
import Medal10 from "@/assets/images/medal/blueGrade.png"; // 46~
import Medal9 from "@/assets/images/medal/greenGrade.png"; // 41~45
import Medal7 from "@/assets/images/medal/orangeGrade.png"; // 31~35
import Medal6 from "@/assets/images/medal/redGrade.png"; // 26~30
import Medal8 from "@/assets/images/medal/yellowGrade.png"; // 36~40

describe("getMedalByLevel", () => {
  it("레벨이 null이면 Medal10을 반환한다", () => {
    expect(getMedalByLevel(null)).toBe(Medal10);
  });

  it("레벨 1~5는 Medal1을 반환한다", () => {
    expect(getMedalByLevel(1)).toBe(Medal1);
    expect(getMedalByLevel(5)).toBe(Medal1);
  });

  it("레벨 6~10은 Medal2를 반환한다", () => {
    expect(getMedalByLevel(6)).toBe(Medal2);
    expect(getMedalByLevel(10)).toBe(Medal2);
  });

  it("레벨 11~15는 Medal3을 반환한다", () => {
    expect(getMedalByLevel(11)).toBe(Medal3);
    expect(getMedalByLevel(15)).toBe(Medal3);
  });

  it("레벨 16~20은 Medal4를 반환한다", () => {
    expect(getMedalByLevel(16)).toBe(Medal4);
    expect(getMedalByLevel(20)).toBe(Medal4);
  });

  it("레벨 21~25는 Medal5를 반환한다", () => {
    expect(getMedalByLevel(21)).toBe(Medal5);
    expect(getMedalByLevel(25)).toBe(Medal5);
  });

  it("레벨 26~30은 Medal6을 반환한다", () => {
    expect(getMedalByLevel(26)).toBe(Medal6);
    expect(getMedalByLevel(30)).toBe(Medal6);
  });

  it("레벨 31~35는 Medal7을 반환한다", () => {
    expect(getMedalByLevel(31)).toBe(Medal7);
    expect(getMedalByLevel(35)).toBe(Medal7);
  });

  it("레벨 36~40은 Medal8을 반환한다", () => {
    expect(getMedalByLevel(36)).toBe(Medal8);
    expect(getMedalByLevel(40)).toBe(Medal8);
  });

  it("레벨 41~45는 Medal9를 반환한다", () => {
    expect(getMedalByLevel(41)).toBe(Medal9);
    expect(getMedalByLevel(45)).toBe(Medal9);
  });

  it("레벨 46 이상은 Medal10을 반환한다", () => {
    expect(getMedalByLevel(46)).toBe(Medal10);
    expect(getMedalByLevel(100)).toBe(Medal10);
  });

  it("그 외 값이 들어올 경우 Medal10 반환한다.", () => {
    expect(getMedalByLevel(-1)).toBe(Medal10);
    expect(getMedalByLevel(NaN as unknown as number)).toBe(Medal10);
  });
});
