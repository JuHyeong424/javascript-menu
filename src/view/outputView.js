import MissionUtils from "@woowacourse/mission-utils";

export async function printStart() {
  return await MissionUtils.Console.print('점심 메뉴 추천을 시작합니다.\n');
}
