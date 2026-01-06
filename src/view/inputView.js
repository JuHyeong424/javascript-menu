import {Console} from "@woowacourse/mission-utils";
import {printError} from "./outputView.js";

export async function inputCoachName() {
  return await Console.readLineAsync('코치의 이름을 입력해 주세요. (, 로 구분)\n')
}

export async function inputNotEatMenu(coachNameArray) {
  const NotEatMenuObject = {};

  for (const name of coachNameArray) {
    while (true) {
      try {
        NotEatMenuObject[name] = await Console.readLineAsync(`${name}(이)가 못 먹는 메뉴를 입력해 주세요.\n`);
        if (Object.values(NotEatMenuObject[name]).length < 0 || Object.values(NotEatMenuObject[name]).length > 2) {
          throw new Error('[ERROR]못 먹는 메뉴는 0~2개 사이입니다.');
        }
        break;
      } catch (e) {
        await printError(e.message);
      }
    }
  }

  return NotEatMenuObject;
}
