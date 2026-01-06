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
        const input = await Console.readLineAsync(`${name}(이)가 못 먹는 메뉴를 입력해 주세요.\n`);
        if (input === '') {
          NotEatMenuObject[name] = '';
          break;
        }
        const menu = input.split(',').map(value => value.trim()).filter(value => value.length > 0);
        if (menu.length < 0 || menu.length > 2) {
          throw new Error('[ERROR]못 먹는 메뉴는 0~2개 사이입니다.');
        }
        NotEatMenuObject[name] = menu.join(',');
        break;
      } catch (e) {
        await printError(e.message);
      }
    }
  }

  return NotEatMenuObject;
}
