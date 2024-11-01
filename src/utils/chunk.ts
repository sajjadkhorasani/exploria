export function chunk<T>(arr: T[], size = 10) {
	return arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), [] as T[][]);
}
