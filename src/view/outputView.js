import {Console} from "@woowacourse/mission-utils";

export async function printStart() {
  return await Console.print('점심 메뉴 추천을 시작합니다.\n');
}

export async function printResult(menu, dayCategoryArray) {
  Console.print('메뉴 추천 결과입니다.');
  Console.print('[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]');
  Console.print(`[ 카테고리 | ${dayCategoryArray.join( ' | ')}`)
  const eachMenu = Object.keys(menu);
  for (const value of eachMenu) {
    const valuesArray = menu[value]
      .split(',')
      .filter(Boolean)
      .map(value => value.trim());
    Console.print(`[ ${value} | ${valuesArray.join(' | ')} ]`)
  }
  Console.print('추천을 완료했습니다.');
}
