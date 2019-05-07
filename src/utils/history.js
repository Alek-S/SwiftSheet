const MAX_HISTORY = 5;
const HISTORY = 'history';

/**
 * @function addToHistory
 * Add new entry to localStorage History
 * @param {string} item - item to add to history
 */
export const addToHistory = item => {
	const currentStorage = JSON.parse(localStorage.getItem(HISTORY));
	let newStorage = currentStorage;

	if (!currentStorage || currentStorage.length < MAX_HISTORY) {
		//history not full
		if (!newStorage) {
			newStorage = [item];
		} else {
			newStorage.push(item);
		}
	}

	if (currentStorage && currentStorage.length >= MAX_HISTORY) {
		//history full
		while (currentStorage.length > MAX_HISTORY - 1) {
			currentStorage.shift();
		}
		newStorage.push(item);
	}

	localStorage.setItem(HISTORY, JSON.stringify(newStorage));
};

/**
 * @function clearHistory
 * get all entries of localStorage history
 * @returns {array} history as array
 */
export const getHistory = () => JSON.parse(localStorage.getItem(HISTORY));

/**
 * @function clearHistory
 * Clear localStorage history
 */
export const clearHistory = () => {
	storage.removeItem(HISTORY);
};
