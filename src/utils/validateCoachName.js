export function validateCoachName(coachNameArray) {
  if (coachNameArray.length === 0) {
    throw new Error('[ERROR]코치 이름을 다시 입력해주세요.');
  }
  if (coachNameArray.length < 2 || coachNameArray.length > 5) {
    throw new Error('[ERROR]코치 수는 2 ~ 5명입니다.');
  }

  for (const value of coachNameArray) {
    if (value.length < 2 || value.length > 4) {
      throw new Error('[ERROR]코치의 이름은 2 ~ 4글자입니다.');
    }
  }
}