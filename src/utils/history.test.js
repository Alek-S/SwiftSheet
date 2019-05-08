import {
	addToHistory,
	removeFromHistory,
	getHistory,
	clearHistory,
	HISTORY,
} from './history';

beforeEach(() => {
	localStorage.clear();
});

describe('History', () => {
	test('addToHistory adds item to local storage', () => {
		addToHistory('mock');
		expect(localStorage.setItem).toHaveBeenLastCalledWith(HISTORY, '["mock"]');
	});

	test('addToHistory max history', () => {
		addToHistory('mock1');
		addToHistory('mock2');
		addToHistory('mock3');
		addToHistory('mock4');
		addToHistory('mock5');
		addToHistory('mock6');
		expect(localStorage.setItem).toHaveBeenLastCalledWith(
			HISTORY,
			'["mock2","mock3","mock4","mock5","mock6"]'
		);
	});

	test('clearHistory to clear', () => {
		addToHistory('mock');
		clearHistory('mock');

		expect(localStorage.removeItem).toHaveBeenLastCalledWith(HISTORY);
	});

	test('getHistory to get item', () => {
		addToHistory('mock');
		getHistory('mock');

		expect(localStorage.getItem).toHaveBeenLastCalledWith(HISTORY);
	});

	test('removeFromHistory to remove', () => {
		addToHistory('mock1');
		addToHistory('mock2');
		addToHistory('mock3');
		removeFromHistory('mock1');

		expect(localStorage.setItem).toHaveBeenLastCalledWith(
			HISTORY,
			'["mock2","mock3"]'
		);
	});

	test('removeFromHistory to clear if empty', () => {
		addToHistory('mock1');
		removeFromHistory('mock1');

		expect(localStorage.removeItem).toHaveBeenLastCalledWith(HISTORY);
	});
});
