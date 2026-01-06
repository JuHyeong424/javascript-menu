import {Console} from "@woowacourse/mission-utils";

export async function inputCoachName() {
  return await Console.readLineAsync('코치의 이름을 입력해 주세요. (, 로 구분)\n')
}

export async function inputNotEatMenu(coachNameArray) {
  const NotEatMenuObject = {};

  for (const name of coachNameArray) {
    NotEatMenuObject[name] = await Console.readLineAsync(`${name}(이)가 못 먹는 메뉴를 입력해 주세요.\n`);
  }

  return NotEatMenuObject;
}
