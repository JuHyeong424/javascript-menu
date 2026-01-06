import MissionUtils from "@woowacourse/mission-utils";

export async function inputCoachName() {
  return new Promise((resolve) => {
    MissionUtils.Console.readLine(
      '코치의 이름을 입력해 주세요. (, 로 구분)\n',
      resolve
    );
  });
}

export async function inputNotEatMenu() {
  return new Promise((resolve) => {
    MissionUtils.Console.readLine(
      '토미(이)가 못 먹는 메뉴를 입력해 주세요.\n',
      resolve
    );
  });
}
