import App from "../src/App.js";
import { Console, Random } from "@woowacourse/mission-utils";

const mockQuestions = (answers) => {
	Console.readLineAsync = jest.fn();
	answers.reduce((acc, input) => {
		return acc.mockReturnValueOnce(Promise.resolve(input));
	}, Console.readLineAsync);
};

const mockRandoms = (numbers) => {
	Random.pickNumberInRange = jest.fn();
	numbers.reduce((acc, number) => {
		return acc.mockReturnValueOnce(number);
	}, Random.pickNumberInRange);
};

const mockShuffles = (rows) => {
	Random.shuffle = jest.fn();
	rows.reduce((acc, [firstNumber, numbers]) => {
		return acc.mockReturnValueOnce([
			firstNumber,
			...numbers.filter((number) => number !== firstNumber),
		]);
	}, Random.shuffle);
};

// 메뉴 이름을 가져오는 헬퍼 함수
const getMenu = (category, index) => {
	const MENUS = {
		일식: '규동, 우동, 미소시루, 스시, 가츠동, 오니기리, 하이라이스, 라멘, 오코노미야끼'.split(', '),
		한식: '김밥, 김치찌개, 쌈밥, 된장찌개, 비빔밥, 칼국수, 불고기, 떡볶이, 제육볶음'.split(', '),
		중식: '깐풍기, 볶음면, 동파육, 짜장면, 짬뽕, 마파두부, 탕수육, 토마토 달걀볶음, 고추잡채'.split(', '),
		아시안: '팟타이, 카오 팟, 나시고렝, 파인애플 볶음밥, 쌀국수, 똠얌꿍, 반미, 월남쌈, 분짜'.split(', '),
		양식: '라자냐, 그라탱, 뇨끼, 끼슈, 프렌치 토스트, 바게트, 스파게티, 피자, 파니니'.split(', '),
	};
	return MENUS[category][index - 1];
};

describe('점심 메뉴 테스트', () => {
	test('전체 기능 테스트 (순서 교정 버전)', async () => {
		const logSpy = jest.spyOn(Console, 'print').mockImplementation(() => {});

		// 카테고리: 한식(2), 양식(5), 일식(1), 중식(3), 아시안(4)
		mockRandoms([2, 5, 1, 3, 4]);
		mockQuestions(['구구,제임스', '김밥', '떡볶이']);

		const seq = Array.from({ length: 9 }, (_, i) => i + 1);

		mockShuffles([
			[getMenu('한식', 2), seq], [getMenu('한식', 9), seq], // 월요일 (구구, 제임스)
			[getMenu('양식', 7), seq], [getMenu('양식', 1), seq], // 화요일 (구구, 제임스)
			[getMenu('일식', 1), seq], [getMenu('일식', 5), seq], // 수요일 (구구, 제임스)
			[getMenu('중식', 4), seq], [getMenu('중식', 5), seq], // 목요일 (구구, 제임스)
			[getMenu('아시안', 2), seq], [getMenu('아시안', 4), seq], // 금요일 (구구, 제임스)
		]);

		const app = new App();
		await app.play();

		const log = logSpy.mock.calls.map(call => call[0]).join('\n');
		expect(log.replace(/\s/g, '')).toContain('추천을완료했습니다.');
		expect(log).toContain('[ 구구 | 김치찌개 | 스파게티 | 규동 | 짜장면 | 카오 팟 ]');
		expect(log).toContain('[ 제임스 | 제육볶음 | 라자냐 | 가츠동 | 짬뽕 | 파인애플 볶음밥 ]');

		logSpy.mockRestore();
	});
});
