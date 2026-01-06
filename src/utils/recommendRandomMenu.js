import {Random} from "@woowacourse/mission-utils";

/*
coachNameArray [ 'a', 'b', 'c' ]
{ '토미': '우동,스시', '제임스': '뇨끼,월남쌈', '포코': '마파두부,고추잡채' }
m {
  코치이름: '1,2,3,4,5';
}
 */
function getRandomMenu(menu, dayCategoryArray, SAMPLE, NotEatMenuObject, coachNameArray) {
  let count = 0;
  while (count < coachNameArray.length) {
    const menus = SAMPLE.split(',');
    const menusIndex = Array.from({ length: menus.length }, (v, i) => i);
    const shuffleMenu = Random.shuffle(menusIndex)[0];
    if (!menu[coachNameArray[count]]) {
      menu[coachNameArray[count]] = '';
    }
    menu[coachNameArray[count]] += menus[shuffleMenu] + ",";

    // 중복 메뉴 확인
    const menuArray = menu[coachNameArray[count]].split(',').map(value => value.trim());
    const set = new Set(menuArray);
    if (menuArray.length !== set.size) {
      menu[coachNameArray[count]] = menu[coachNameArray[count]].slice(0, -(menus[shuffleMenu].length + 1))
      continue;
    }

    // 못먹는 메뉴 확인
    if (NotEatMenuObject[coachNameArray[count]]) {
      const NotEatMenuKeyArray = Object.keys(NotEatMenuObject);
      if (NotEatMenuKeyArray.includes(coachNameArray[count])) {
        const NotEatMenuValueArray = NotEatMenuObject[coachNameArray[count]].split(',').map(value => value.trim());
        for (const value of NotEatMenuValueArray) {
          if (set.has(value)) {
            menu[coachNameArray[count]] = menu[coachNameArray[count]].slice(0, -(menus[shuffleMenu].length + 1))
            count--;
            break;
          }
        }
      }
    }

    count++;
  }
}

function getDish(SAMPLE, dayCategoryArray, menu, NotEatMenuObject, coachNameArray) {
  const categoryCountArray = [0, 0, 0, 0, 0, 0];
  let count = 0;

  while (count < 5) {
    const category = Random.pickNumberInRange(1, 5);

    switch (category) {
      case 1:
        if (categoryCountArray[0] === 2) break;
        dayCategoryArray.push('일식');
        getRandomMenu(menu, dayCategoryArray, SAMPLE.일식, NotEatMenuObject, coachNameArray);
        categoryCountArray[0] += 1;
        count++;
        break;
      case 2:
        if (categoryCountArray[1] === 2) break;
        dayCategoryArray.push('한식');
        getRandomMenu(menu, dayCategoryArray, SAMPLE.한식, NotEatMenuObject, coachNameArray);
        categoryCountArray[1] += 1;
        count++;
        break;
      case 3:
        if (categoryCountArray[2] === 2) break;
        dayCategoryArray.push('중식');
        getRandomMenu(menu, dayCategoryArray, SAMPLE.중식, NotEatMenuObject, coachNameArray);
        categoryCountArray[2] += 1;
        count++;
        break;
      case 4:
        if (categoryCountArray[3] === 2) break;
        dayCategoryArray.push('아시안');
        getRandomMenu(menu, dayCategoryArray, SAMPLE.아시안, NotEatMenuObject, coachNameArray);
        categoryCountArray[3] += 1;
        count++;
        break;
      case 5:
        if (categoryCountArray[4] === 2) break;
        dayCategoryArray.push('양식');
        getRandomMenu(menu, dayCategoryArray, SAMPLE.양식, NotEatMenuObject, coachNameArray);
        categoryCountArray[4] += 1;
        count++;
        break;
    }
  }
}

export function recommendRandomMenu(SAMPLE, NotEatMenuObject, coachNameArray) {
  const dayCategoryArray = [];
  const menu = {};
  console.log(NotEatMenuObject)
  getDish(SAMPLE, dayCategoryArray, menu, NotEatMenuObject, coachNameArray);
  return [menu, dayCategoryArray];
}
