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

const getLogSpy = () => {
	const logSpy = jest.spyOn(Console, 'print');
	logSpy.mockClear(); // 이전 기록 삭제
	return logSpy;
};

// 로그 출력 결과를 가독성 있게 합칩니다.
const getOutput = (logSpy) => {
	return [...logSpy.mock.calls].map((call) => call[0]).join('\n');
};

describe('점심 메뉴 테스트', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('전체 기능 테스트', () => {
		test('카테고리 메뉴 중복 없는 추천', async () => {
			// 1. LogSpy 설정
			const logSpy = getLogSpy();

			// 2. Mock 데이터 설정
			mockRandoms([2, 5, 1, 3, 4]);
			mockQuestions(['구구,제임스', '김밥', '떡볶이']);

			const sequenced = (_, idx) => idx + 1;
			mockShuffles([
				// 구구
				[2, Array.from({ length: 9 }, sequenced)],
				[7, Array.from({ length: 9 }, sequenced)],
				[1, Array.from({ length: 9 }, sequenced)],
				[4, Array.from({ length: 9 }, sequenced)],
				[2, Array.from({ length: 9 }, sequenced)],

				//제임스
				[9, Array.from({ length: 9 }, sequenced)],
				[1, Array.from({ length: 9 }, sequenced)],
				[5, Array.from({ length: 9 }, sequenced)],
				[5, Array.from({ length: 9 }, sequenced)],
				[4, Array.from({ length: 9 }, sequenced)],
			]);

			// 3. 앱 실행 (반드시 await 필수!)
			const app = new App();
			await app.play();

			// 4. 결과 검증
			const log = getOutput(logSpy);

			// 공백과 줄바꿈을 제거하고 포함 여부를 확인하여 형식 차이로 인한 오류 방지
			const received = log.replace(/\s/g, '');
			const expected = [
				'점심메뉴추천을시작합니다.',
				'메뉴추천결과입니다.',
				'[구분|월요일|화요일|수요일|목요일|금요일]',
				'[카테고리|한식|양식|일식|중식|아시안]',
				'[구구|김치찌개|스파게티|규동|짜장면|카오팟]',
				'[제임스|제육볶음|라자냐|가츠동|짬뽕|파인애플볶음밥]',
				'추천을완료했습니다.',
			].join('').replace(/\s/g, '');

			expect(received).toContain(expected);
		});
	});
});
